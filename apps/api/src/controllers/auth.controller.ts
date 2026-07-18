import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { signAccessToken } from '../services/token.service.js';

export async function register(req: Request, res: Response): Promise<Response> {
  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, authProvider: 'local' });
  const token = signAccessToken({ sub: String(user._id), role: user.role as 'user' | 'admin' });

  return res.status(201).json(new ApiResponse('User registered successfully', { token, user }));
}

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new ApiError(401, 'Invalid credentials');
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signAccessToken({ sub: String(user._id), role: user.role as 'user' | 'admin' });
  return res.json(new ApiResponse('Login successful', { token, user }));
}

export async function me(req: Request, res: Response): Promise<Response> {
  return res.json(new ApiResponse('Current user', { user: req.user ?? null }));
}
