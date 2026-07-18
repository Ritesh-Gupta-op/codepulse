import type { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Repository } from '../models/Repository.js';
import { Analysis } from '../models/Analysis.js';
import { ApiResponse } from '../utils/apiResponse.js';

export async function getAdminOverview(_req: Request, res: Response): Promise<Response> {
  const [users, repositories, analyses] = await Promise.all([
    User.countDocuments(),
    Repository.countDocuments(),
    Analysis.countDocuments()
  ]);

  return res.json(new ApiResponse('Admin overview', { users, repositories, analyses }));
}
