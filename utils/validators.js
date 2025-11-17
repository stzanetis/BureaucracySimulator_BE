import { AppError } from './helpers.js';

/**
 * Validate nickname and seed for user creation.
 *
 * @param {{nickname?: string, seed?: number}} payload
 */
export const validateUserPayload = (payload) => {
  const { nickname, seed } = payload;

  if (!nickname || typeof nickname !== 'string' || !nickname.trim()) {
    throw new AppError('Nickname is required.', 400, 'VALIDATION_ERROR');
  }
  if (seed === undefined || seed === null || Number.isNaN(Number(seed))) {
    throw new AppError('Seed is required and must be a number.', 400, 'VALIDATION_ERROR');
  }
};

/**
 * Validate elapsedTime for endscreen POST.
 *
 * @param {{elapsedTime?: number}} payload
 */
export const validateElapsedTimePayload = (payload) => {
  const { elapsedTime } = payload;
  if (elapsedTime === undefined || elapsedTime === null) {
    throw new AppError('Elapsed time is required.', 400, 'VALIDATION_ERROR');
  }
  if (!Number.isFinite(Number(elapsedTime)) || Number(elapsedTime) <= 0) {
    throw new AppError('Elapsed time must be a positive number.', 400, 'VALIDATION_ERROR');
  }
};

/**
 * Validate task update payload (userInput must be present).
 *
 * @param {{userInput?: any}} payload
 */
export const validateTaskUpdatePayload = (payload) => {
  if (!Object.prototype.hasOwnProperty.call(payload, 'userInput')) {
    throw new AppError('userInput is required.', 400, 'VALIDATION_ERROR');
  }
};
