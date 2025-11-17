import { Router } from 'express';
import {
  getEndscreenStats,
  postEndscreenStats
} from '../controllers/endscreenController.js';
import { validateElapsedTime } from '../middleware/validation.js';

const router = Router();

/**
 * GET /endscreen/
 * POST /endscreen/
 */
router.get('/', getEndscreenStats);
router.post('/', validateElapsedTime, postEndscreenStats);

export default router;
