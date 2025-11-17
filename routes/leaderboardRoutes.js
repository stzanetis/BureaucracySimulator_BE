import { Router } from 'express';
import {
  deleteLeaderboardEntryController,
  getLeaderboard,
  putLeaderboardEntry
} from '../controllers/leaderboardController.js';

const router = Router();

/**
 * /leaderboard/
 */
router.get('/', getLeaderboard);

/**
 * Non-OpenAPI: full CRUD for leaderboard entries
 * PUT /leaderboard/:name
 * DELETE /leaderboard/:name
 */
router.put('/:name', putLeaderboardEntry);
router.delete('/:name', deleteLeaderboardEntryController);

export default router;
