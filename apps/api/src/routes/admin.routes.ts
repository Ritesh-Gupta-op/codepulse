import { Router } from 'express';
import { getAdminOverview } from '../controllers/admin.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/overview', requireAuth, requireRole('admin'), asyncHandler(getAdminOverview));

export { router as adminRouter };
