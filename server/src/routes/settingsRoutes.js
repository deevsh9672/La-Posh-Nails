import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to view salon business details
router.get('/', getSettings);

// Admin protected route to modify settings
router.patch('/', protectAdmin, updateSettings);

export default router;
