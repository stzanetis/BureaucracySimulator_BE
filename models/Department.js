/**
 * @fileoverview Mongoose model for game departments.
 * Departments represent different bureaucratic offices in the game.
 * Each department is associated with a specific task type/page.
 * @module models/Department
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema definition for departments.
 * @typedef {Object} DepartmentSchema
 * @property {string} name - Human-readable department name
 * @property {string} pageName - Frontend route/page identifier for this department's task
 * @property {Date} createdAt - Timestamp of creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last update (auto-generated)
 */
const departmentSchema = new Schema(
  {
    /** Display name of the department (e.g., "CAPTCHA Complaints Unit") */
    name: { type: String, required: true },
    
    /** Associated frontend page route (e.g., "captcha-task") */
    pageName: { type: String, required: true }
  },
  {
    // Auto-generate createdAt and updatedAt fields
    timestamps: true
  }
);

/**
 * Mongoose model for departments.
 * Uses existing model if already compiled (for hot-reloading support).
 * @type {mongoose.Model}
 */
export const Department =
  mongoose.models.Department || mongoose.model('Department', departmentSchema);
