import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.warn('Could not connect to MongoDB; running in degraded mode.');
    console.warn(error && error.message ? error.message : error);
  }
}
