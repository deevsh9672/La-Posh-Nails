import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Limit each IP to 30 bookings per hour
  message: {
    success: false,
    message: 'Too many booking requests. Please contact salon via WhatsApp directly or try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 course enquiries per hour
  message: {
    success: false,
    message: 'Too many course enquiries submitted. Please contact academy via WhatsApp directly.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
