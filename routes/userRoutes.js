import { Router } from 'express';
import { getUsers, postUserHomeScreen } from '../controllers/userController.js';
import { validateUser } from '../middleware/validation.js';

const router = Router();

/**
 * POST /user/
 * GET /user/
 */
router.post('/', validateUser, postUserHomeScreen);
router.get('/', getUsers);

export default router;
