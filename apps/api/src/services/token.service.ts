import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signAccessToken(payload: { sub: string; role: 'user' | 'admin' }): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_SECRET, options);
}
