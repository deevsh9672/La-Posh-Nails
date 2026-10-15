import { z } from 'zod';

export const createAppointmentSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  phone: z.string().regex(/^[0-9+-\s]{10,15}$/, 'Valid phone number is required (10-15 digits)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Valid service ID is required'),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be HH:mm'),
  bookingType: z.enum(['salon', 'home']).default('salon'),
  customerNotes: z.string().max(500).optional().default(''),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled', 'No-show']),
  adminNotes: z.string().max(1000).optional(),
});
