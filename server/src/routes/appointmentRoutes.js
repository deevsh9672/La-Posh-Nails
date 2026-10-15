import express from 'express';
import {
  getAvailability,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getDashboardMetrics,
} from '../controllers/appointmentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { bookingLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/availability', getAvailability);
router.post('/', bookingLimiter, createAppointment);

// Admin protected routes
router.get('/metrics', protectAdmin, getDashboardMetrics);
router.get('/', protectAdmin, getAppointments);
router.get('/:id', protectAdmin, getAppointmentById);
router.patch('/:id/status', protectAdmin, updateAppointmentStatus);
router.patch('/:id', protectAdmin, updateAppointmentStatus);
router.delete('/:id', protectAdmin, deleteAppointment);

export default router;
