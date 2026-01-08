import {
  validateElapsedTimePayload,
  validateTaskUpdatePayload,
  validateUserPayload
} from '../utils/validators.js';

/**
 * Middleware wrapper for user creation validation.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const validateUser = (req, _, next) => {
  try {
    validateUserPayload(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware for validating endscreen POST body.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const validateElapsedTime = (req, _, next) => {
  try {
    validateElapsedTimePayload(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware for validating task update body.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const validateTaskUpdate = (req, _, next) => {
  try {
    validateTaskUpdatePayload(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
