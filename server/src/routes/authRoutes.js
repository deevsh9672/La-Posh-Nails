import express from 'express';
import { login, logout, getMe, bootstrapAdmin } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);
router.post('/bootstrap', bootstrapAdmin);

export default router;
