import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'laposh_super_secret_jwt_key_beauty_2026_change_in_production';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  };

  res.cookie('laposh_token', token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.cookie('laposh_token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

export const bootstrapAdmin = async (req, res, next) => {
  try {
    const { setupSecret, name, email, password } = req.body;
    const expectedSecret = process.env.ADMIN_SETUP_SECRET || 'laposh_bootstrap_admin_secret_key_2026';

    if (!setupSecret || setupSecret !== expectedSecret) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid bootstrap setup secret key',
      });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Administrator with this email already exists',
      });
    }

    const passwordHash = await Admin.hashPassword(password);
    const newAdmin = await Admin.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'superadmin',
    });

    sendTokenResponse(newAdmin, 201, res);
  } catch (error) {
    next(error);
  }
};
