import { leaderboard } from '../config/mockData/index.js';
import { AppError } from '../utils/helpers.js';

/**
 * Retrieve the current leaderboard (sorted by score ascending).
 *
 * @returns {Promise<{name: string, score: number}[]>}
 */
export const getLeaderboardService = async () => {
  await Promise.resolve();
  return leaderboard.slice().sort((a, b) => a.score - b.score);
};

/**
 * Add or update a leaderboard entry.
 *
 * @param {string} name
 * @param {number} score
 * @returns {Promise<{name: string, score: number}>}
 */
export const upsertLeaderboardEntry = async (name, score) => {
  if (!name || !name.trim()) {
    throw new AppError('Name is required for leaderboard.', 400, 'VALIDATION_ERROR');
  }
  if (!Number.isFinite(Number(score))) {
    throw new AppError('Score must be numeric.', 400, 'VALIDATION_ERROR');
  }

  const existingIndex = leaderboard.findIndex((entry) => entry.name === name);

  if (existingIndex >= 0) {
    leaderboard[existingIndex].score = Number(score);
    return leaderboard[existingIndex];
  }

  const newEntry = { name: name.trim(), score: Number(score) };
  leaderboard.push(newEntry);
  return newEntry;
};

/**
 * Delete a leaderboard entry by name.
 *
 * @param {string} name
 * @returns {Promise<void>}
 */
export const deleteLeaderboardEntry = async (name) => {
  const index = leaderboard.findIndex((entry) => entry.name === name);
  if (index === -1) {
    throw new AppError('Leaderboard entry not found.', 404, 'NOT_FOUND');
  }
  leaderboard.splice(index, 1);
};
