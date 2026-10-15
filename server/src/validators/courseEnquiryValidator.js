import { z } from 'zod';

export const createCourseEnquirySchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  phone: z.string().regex(/^[0-9+-\s]{10,15}$/, 'Valid phone number is required (10-15 digits)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  courseInterest: z.string().min(2, 'Course interest is required').max(150),
  skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Professional Refresher']).default('Beginner'),
  preferredBatch: z.enum(['Weekday Morning (10 AM - 1 PM)', 'Weekday Afternoon (2 PM - 5 PM)', 'Weekend Intensive', 'Flexible / Fast Track']).default('Weekday Morning (10 AM - 1 PM)'),
  message: z.string().max(1000).optional().default(''),
});

export const updateCourseEnquirySchema = z.object({
  status: z.enum(['New', 'Contacted', 'Enrolled', 'Closed']),
  followUpNotes: z.string().max(1000).optional(),
});
