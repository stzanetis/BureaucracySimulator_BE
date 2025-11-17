import { Router } from 'express';
import { getStartscreen } from '../controllers/startscreenController.js';

const router = Router();

/**
 * /startscreen/
 */
router.get('/', getStartscreen);

export default router;
