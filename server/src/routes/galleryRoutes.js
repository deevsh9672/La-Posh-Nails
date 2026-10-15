import express from 'express';
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getGalleryImages);

// Admin protected routes
router.post('/', protectAdmin, upload.single('image'), createGalleryImage);
router.patch('/:id', protectAdmin, upload.single('image'), updateGalleryImage);
router.delete('/:id', protectAdmin, deleteGalleryImage);

export default router;
