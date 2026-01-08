/**
 * @fileoverview Mongoose model for bureaucratic tasks.
 * Defines the schema for various task types in the game.
 * @module models/Task
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Valid task type identifiers.
 * @typedef {'CAPTCHA'|'FORM'|'PUZZLE'|'DISPLAY'|'SIGNATURE'|'COFFEE'} TaskType
 */

/**
 * Schema definition for tasks.
 * @typedef {Object} TaskSchema
 * @property {TaskType} taskType - Type of bureaucratic task
 * @property {boolean} completed - Whether the task has been completed
 * @property {string} pageName - Frontend route/page identifier
 * @property {Object} meta - Additional task-specific metadata
 * @property {Date} createdAt - Timestamp of creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last update (auto-generated)
 */
const taskSchema = new Schema(
  {
    /** Type identifier (CAPTCHA, FORM, PUZZLE, etc.) */
    taskType: { type: String, required: true },
    /** Completion status flag */
    completed: { type: Boolean, default: false },
    /** Associated frontend page/route name */
    pageName: { type: String, required: true },
    /** Flexible metadata for task-specific data */
    meta: { type: Schema.Types.Mixed }
  },
  {
    timestamps: true,
    collection: 'tasks'
  }
);

// Performance indexes
taskSchema.index({ completed: 1 });
taskSchema.index({ taskType: 1 });

/**
 * Mongoose model for tasks.
 * Uses existing model if already compiled (for hot-reloading support).
 * @type {mongoose.Model}
 */
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
