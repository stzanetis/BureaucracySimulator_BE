/**
 * @fileoverview Mongoose model for game users/players.
 * Stores player information and their assigned task list.
 * @module models/User
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema definition for users.
 * @typedef {Object} UserSchema
 * @property {string} nickname - Player's display name (trimmed)
 * @property {number} seed - Random seed for task generation
 * @property {ObjectId[]} toDoList - Array of Task references
 * @property {Date} createdAt - Timestamp of creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last update (auto-generated)
 */
const userSchema = new Schema(
  {
    /** Player's chosen display name */
    nickname: { type: String, required: true, trim: true },
    /** Random seed for deterministic task generation */
    seed: { type: Number, required: true },
    /** References to assigned Task documents */
    toDoList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

/**
 * Mongoose model for users.
 * Uses existing model if already compiled (for hot-reloading support).
 * @type {mongoose.Model}
 */
export const User = mongoose.models.User || mongoose.model('User', userSchema);
