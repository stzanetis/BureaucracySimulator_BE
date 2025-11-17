/**
 * Custom application error class used by services/controllers.
 */
export class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   * @param {string} [code]
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

/**
 * Simple pseudo-random generator seeded by an integer, used to create
 * deterministic to-do lists from a user seed.
 *
 * @param {number} seed
 * @returns {() => number} function that returns a float in [0,1)
 */
export const createSeededRng = (seed) => {
  let value = seed || 1;
  return () => {
    // LCG parameters
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};
