import { Router } from 'express';
import { basicAuth } from '../middleware/auth.js';

import startscreenRoutes from './startscreenRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';
import aboutRoutes from './aboutRoutes.js';
import endscreenRoutes from './endscreenRoutes.js';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = Router();

/**
 * Apply basic auth to all API routes.
 */
router.use(basicAuth);

/**
 * Mount all route groups.
 * These paths match the OpenAPI specification.
 */
router.use('/startscreen/', startscreenRoutes);
router.use('/leaderboard/', leaderboardRoutes);
router.use('/about-us/', aboutRoutes);
router.use('/endscreen/', endscreenRoutes);
router.use('/user/', userRoutes);
router.use('/user', taskRoutes); // notice: task routes are nested under /user

export default router;
