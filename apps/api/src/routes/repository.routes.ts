import { Router } from 'express';
import { getRepositoryInsights, importRepository, listRepositories } from '../controllers/repo.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(listRepositories));
router.post('/import', requireAuth, asyncHandler(importRepository));
router.get('/:id', requireAuth, asyncHandler(getRepositoryInsights));

export { router as repositoryRouter };
