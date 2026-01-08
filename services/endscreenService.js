import { leaderboard } from '../config/mockData/index.js';

/**
 * Compute percentile based on elapsed time vs leaderboard scores.
 * Lower time = better.
 *
 * @param {number} elapsedTime
 * @returns {Promise<{elapsedTime: number, percentile: number}>}
 */
export const computeEndscreenStats = async (elapsedTime) => {
  const times = leaderboard.map((entry) => entry.score);

  if (times.length === 0) {
    return { elapsedTime, percentile: 100 };
  }

  const betterCount = times.filter((t) => t > elapsedTime).length;
  const percentile = Math.round((betterCount / times.length) * 100);

  return { elapsedTime, percentile };
};
