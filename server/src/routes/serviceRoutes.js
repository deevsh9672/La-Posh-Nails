import express from 'express';
import {
  getServices,
  getServiceBySlugOrId,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:identifier', getServiceBySlugOrId);

// Admin protected routes
router.post('/', protectAdmin, upload.single('image'), createService);
router.patch('/:id', protectAdmin, upload.single('image'), updateService);
router.delete('/:id', protectAdmin, deleteService);

export default router;
