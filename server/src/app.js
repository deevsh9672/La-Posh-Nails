import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration with explicit allowed-origin list
const clientUrls = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = [
  ...clientUrls,
  'https://la-posh-nails.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5001',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body and Cookie parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

import { connectDB } from './config/db.js';

// Static uploads folder for local fallback
app.use('/uploads', express.static(path.resolve('uploads')));

// Ensure Database connection for serverless / Vercel execution
app.use(async (req, res, next) => {
  // Allow health check without waiting for DB
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[Database Connection Middleware Error]:', err.message);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGODB_URI environment variable is configured in Vercel.',
      error: err.message,
    });
  }
});

// Root information endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Khan Hair Xpenso API',
    location: 'Kurukshetra, Haryana',
    endpoints: {
      health: '/api/health',
      services: '/api/services',
      appointments: '/api/appointments',
      gallery: '/api/gallery',
      settings: '/api/settings',
    },
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Khan Hair Xpenso API',
    location: 'Kurukshetra, Haryana',
  });
});

// REST API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/course-enquiries', enquiryRoutes);
app.use('/api/settings', settingsRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
