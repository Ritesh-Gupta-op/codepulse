import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/summary', requireAuth, asyncHandler(getDashboardSummary));

export { router as dashboardRouter };
