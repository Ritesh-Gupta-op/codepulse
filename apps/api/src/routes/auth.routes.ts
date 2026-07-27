import { Router } from 'express';
import { verify2FA, loginUser } from '../controllers/auth.controller.js';

const router = Router();

// Step 1: Initial Login (returns require2FA status + temporary token)
router.post('/login', loginUser);

// Step 2: Verify 6-digit OTP code
router.post('/verify-2fa', verify2FA);

export default router;