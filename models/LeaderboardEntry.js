/**
 * @fileoverview Mongoose model for leaderboard entries.
 * Stores player scores for the global leaderboard ranking.
 * @module models/LeaderboardEntry
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema definition for leaderboard entries.
 * @typedef {Object} LeaderboardEntrySchema
 * @property {string} name - Player's display name on the leaderboard
 * @property {number} score - Player's score (lower is better, based on completion time)
 * @property {Date} createdAt - Timestamp of entry creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last update (auto-generated)
 */
const leaderboardEntrySchema = new Schema(
  {
    /** Player's display name */
    name: { type: String, required: true },
    
    /** Player's score (derived from elapsed time; lower = better) */
    score: { type: Number, required: true }
  },
  {
    // Auto-generate createdAt and updatedAt fields
    timestamps: true
  }
);

// Index for efficient leaderboard queries (sorted by score ascending)
leaderboardEntrySchema.index({ score: 1 });

/**
 * Mongoose model for leaderboard entries.
 * Uses existing model if already compiled (for hot-reloading support).
 * @type {mongoose.Model}
 */
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
