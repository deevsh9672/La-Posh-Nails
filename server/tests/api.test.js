import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import Admin from '../src/models/Admin.js';
import Service from '../src/models/Service.js';
import BusinessSettings from '../src/models/BusinessSettings.js';
import Appointment from '../src/models/Appointment.js';

let mongoServer;
let adminToken;
let testService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Setup Business Settings
  await BusinessSettings.create({
    businessName: 'La Posh Nails Studio & Makeup Hairstyles Academy',
    address: '102 Pride Corporate, Kalavad Road, Rajkot',
    phone: '+91 95123 48787',
    openingHours: { start: '10:00', end: '20:00', days: 'Monday – Sunday' },
    googleRating: { rating: 4.3, reviewCount: 189 },
    bookingSettings: {
      slotIntervalMinutes: 30,
      bufferMinutes: 15,
      maxAdvanceDays: 30,
      simultaneousStaffCount: 1, // Set to 1 for easy collision testing
    },
  });

  // Setup Test Service
  testService = await Service.create({
    name: 'Acrylic Nail Extensions',
    slug: 'acrylic-nail-extensions',
    category: 'Acrylic Nail Extensions',
    description: 'High strength full acrylic extensions',
    durationMinutes: 60,
    isActive: true,
  });

  // Setup Admin
  const passwordHash = await Admin.hashPassword('AdminTest123');
  await Admin.create({
    name: 'Admin Tester',
    email: 'admin@laposh.com',
    passwordHash,
    role: 'superadmin',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('La Posh REST API Test Suite', () => {
  test('1. Health check returns 200 and operational status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body.service).toContain('La Posh');
  });

  test('2. Public services endpoint lists available services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].slug).toBe('acrylic-nail-extensions');
  });

  test('3. Availability endpoint generates accurate slots (10:00 - 20:00)', async () => {
    const res = await request(app)
      .get('/api/appointments/availability')
      .query({ date: '2026-10-25', serviceId: testService._id.toString() });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slots.length).toBeGreaterThan(0);
    expect(res.body.data.slots[0].startTime).toBe('10:00');
    expect(res.body.data.slots[0].endTime).toBe('11:00'); // 60 mins duration
    expect(res.body.data.slots[0].available).toBe(true);
  });

  test('4. Customer can submit a booking request', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({
        customerName: 'Priya Sharma',
        phone: '9876543210',
        email: 'priya@example.com',
        serviceId: testService._id.toString(),
        appointmentDate: '2026-10-25',
        startTime: '10:00',
        bookingType: 'salon',
        customerNotes: 'First time visiting salon',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.bookingReference).toMatch(/^LP-\d{8}-[A-Z0-9]{4}$/);
    expect(res.body.data.status).toBe('Pending');
  });

  test('5. Double-booking conflict prevention rejects concurrent/overlapping slot', async () => {
    // Attempt to book the EXACT same slot when capacity is 1
    const res = await request(app)
      .post('/api/appointments')
      .send({
        customerName: 'Anjali Patel',
        phone: '9898989898',
        email: 'anjali@example.com',
        serviceId: testService._id.toString(),
        appointmentDate: '2026-10-25',
        startTime: '10:00',
        bookingType: 'salon',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('no longer available');
  });

  test('6. Course enquiry submission saves lead successfully', async () => {
    const res = await request(app)
      .post('/api/course-enquiries')
      .send({
        studentName: 'Riddhi Mehta',
        phone: '9825012345',
        email: 'riddhi@example.com',
        courseInterest: 'Comprehensive Professional Nail Art Masterclass',
        skillLevel: 'Beginner',
        preferredBatch: 'Weekday Morning (10 AM - 1 PM)',
        message: 'Looking to start my own salon studio in Rajkot',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('New');
  });

  test('7. Protected admin routes reject unauthenticated requests', async () => {
    const res = await request(app).get('/api/appointments');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('8. Admin login succeeds with valid credentials and sets cookie & token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@laposh.com',
        password: 'AdminTest123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  test('9. Admin can access protected appointments with Bearer token', async () => {
    const res = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('10. Business settings endpoint returns business details', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.businessName).toBe('La Posh Nails Studio & Makeup Hairstyles Academy');
    expect(res.body.data.googleRating.rating).toBe(4.3);
  });
});
