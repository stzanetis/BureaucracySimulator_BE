/**
 * @fileoverview Mongoose model for game attempts/sessions.
 * Tracks user gameplay sessions with timing and scoring data.
 * @module models/Attempt
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema definition for game attempts.
 * @typedef {Object} AttemptSchema
 * @property {string} nickname - Player's display name for this attempt
 * @property {number} elapsedTime - Total time taken in seconds
 * @property {number} score - Final score achieved
 * @property {Date} createdAt - Timestamp of attempt creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last update (auto-generated)
 */
const attemptSchema = new Schema(
  {
    /** Player's chosen nickname for this session */
    nickname: { type: String, required: true },
    /** Time elapsed during gameplay in seconds */
    elapsedTime: { type: Number, required: true },
    /** Calculated score based on performance */
    score: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: 'attempts'
  }
);

// Performance indexes
attemptSchema.index({ score: -1 });
attemptSchema.index({ createdAt: -1 });

/**
 * Mongoose model for game attempts.
 * Uses existing model if already compiled (for hot-reloading support).
 * @type {mongoose.Model}
 */
export const Attempt = mongoose.models.Attempt || mongoose.model('Attempt', attemptSchema);
