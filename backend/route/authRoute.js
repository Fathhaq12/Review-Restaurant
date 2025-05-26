import express from 'express';
import { register, login } from '../controller/authController.js';
import { refreshToken } from '../controller/RefreshToken.js';

const router = express.Router();

router.post('/register', register);     // Endpoint untuk registrasi user
router.post('/login', login);           // Endpoint untuk login user
router.get('/refresh-token', refreshToken); // Endpoint untuk refresh token

export default router;