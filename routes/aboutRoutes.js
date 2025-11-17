import { Router } from 'express';
import { getAboutUs } from '../controllers/aboutController.js';

const router = Router();

/**
 * /about-us/
 */
router.get('/', getAboutUs);

export default router;
