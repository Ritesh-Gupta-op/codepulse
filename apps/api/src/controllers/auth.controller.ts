import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// In-memory or Redis/Mongo store for pending OTPs (use DB for production)
const pendingOTPs = new Map<string, { code: string; expiresAt: number }>();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Validate user credentials from MongoDB here...
  // const user = await User.findOne({ email });

  // 2. Generate a 6-digit OTP code
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 3. Store OTP temporarily (expires in 5 mins)
  pendingOTPs.set(email, {
    code: otpCode,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  // 4. Send OTP via email (Console log for local testing)
  console.log(`[2FA OTP CODE for ${email}]: ${otpCode}`);

  return res.status(200).json({
    success: true,
    require2FA: true,
    email,
    message: "2FA code sent to your email.",
  });
};

export const verify2FA = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const record = pendingOTPs.get(email);

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP expired or invalid" });
  }

  if (record.code !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP code" });
  }

  // Clear OTP after successful use
  pendingOTPs.delete(email);

  // Generate final auth token
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

  return res.status(200).json({
    success: true,
    message: "Authentication successful",
    token,
  });
};