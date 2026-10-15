import express from 'express';
import {
  createCourseEnquiry,
  getCourseEnquiries,
  getCourseEnquiryById,
  updateCourseEnquiry,
  deleteCourseEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/', enquiryLimiter, createCourseEnquiry);

// Admin protected routes
router.get('/', protectAdmin, getCourseEnquiries);
router.get('/:id', protectAdmin, getCourseEnquiryById);
router.patch('/:id', protectAdmin, updateCourseEnquiry);
router.delete('/:id', protectAdmin, deleteCourseEnquiry);

export default router;
