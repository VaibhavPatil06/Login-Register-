import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controller/authController.js';
import verifyToken from '../utlis/authMiddelware.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Profile route (protected)
router.get('/profile', verifyToken, getUserProfile);

export default router;
