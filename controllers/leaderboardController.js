import {
  deleteLeaderboardEntry,
  getLeaderboardService,
  upsertLeaderboardEntry
} from '../services/leaderboardService.js';
import { sendSuccess } from '../utils/responses.js';

/**
 * GET /leaderboard/
 * Return leaderboard data.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const data = await getLeaderboardService();
    sendSuccess(res, { leaderboard: data }, 'Leaderboard retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /leaderboard/:name
 * Non-OpenAPI endpoint for updating/creating leaderboard entries.
 * Required for full CRUD and testing.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const putLeaderboardEntry = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { score } = req.body;
    const entry = await upsertLeaderboardEntry(name, Number(score));
    sendSuccess(res, entry, 'Leaderboard entry upserted.');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /leaderboard/:name
 * Non-OpenAPI endpoint for deleting leaderboard entries.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const deleteLeaderboardEntryController = async (req, res, next) => {
  try {
    const { name } = req.params;
    await deleteLeaderboardEntry(name);
    sendSuccess(res, null, 'Leaderboard entry deleted.', 204);
  } catch (error) {
    next(error);
  }
};
