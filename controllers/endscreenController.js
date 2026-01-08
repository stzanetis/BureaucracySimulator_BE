import { computeEndscreenStats } from '../services/endscreenService.js';
import { upsertLeaderboardEntry } from '../services/leaderboardService.js';
import { sendSuccess } from '../utils/responses.js';

/**
 * GET /endscreen/
 * Retrieve statistics for user attempt (mock percentile).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getEndscreenStats = async (_req, res, next) => {
  try {
    // Simple mock: assume last recorded expired time is mid-percentile
    const elapsedTime = 145;
    const stats = await computeEndscreenStats(elapsedTime);
    sendSuccess(res, stats, 'Endscreen stats retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /endscreen/
 * Submit statistics for user attempt.
 * Body: { elapsedTime: number }
 * Optional query: ?nickname=SomeName (for leaderboard)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const postEndscreenStats = async (req, res, next) => {
  try {
    const { elapsedTime } = req.body;
    const nickname = (req.query.nickname || 'Anonymous')?.toString();

    const stats = await computeEndscreenStats(Number(elapsedTime));

    // Treat elapsedTime as "score" (lower is better)
    await upsertLeaderboardEntry(nickname, Number(elapsedTime));

    sendSuccess(
      res,
      {
        elapsedTime: stats.elapsedTime,
        percentile: stats.percentile
      },
      'Endscreen stats submitted.'
    );
  } catch (error) {
    next(error);
  }
};
