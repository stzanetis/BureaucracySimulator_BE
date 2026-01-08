/**
 * @fileoverview Basic Authentication middleware for protecting routes.
 * Implements HTTP Basic Authentication using credentials from environment variables.
 * @module middleware/auth
 */

import { AppError } from '../utils/helpers.js';

/**
 * Extracts and decodes Basic Authentication credentials from the header.
 * @param {string} authHeader - The Authorization header value
 * @returns {{ username: string, password: string }} Decoded credentials
 * @throws {AppError} If header is missing or malformed
 */
const extractCredentials = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    throw new AppError('Missing Authorization header.', 401, 'AUTH_REQUIRED');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = decoded.split(':');

  return { username, password };
};

/**
 * Retrieves expected credentials from environment variables.
 * @returns {{ expectedUser: string, expectedPass: string }} Expected credentials
 * @throws {AppError} If environment variables are not configured
 */
const getExpectedCredentials = () => {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;

  if (!expectedUser || !expectedPass) {
    throw new AppError(
      'Server misconfiguration: Basic auth credentials not set.',
      500,
      'AUTH_CONFIG_ERROR'
    );
  }

  return { expectedUser, expectedPass };
};

/**
 * Validates provided credentials against expected values.
 * @param {string} username - Provided username
 * @param {string} password - Provided password
 * @param {string} expectedUser - Expected username
 * @param {string} expectedPass - Expected password
 * @throws {AppError} If credentials don't match
 */
const validateCredentials = (username, password, expectedUser, expectedPass) => {
  if (username !== expectedUser || password !== expectedPass) {
    throw new AppError('Invalid credentials.', 401, 'AUTH_INVALID');
  }
};

/**
 * Basic Authentication middleware.
 * Protects routes by requiring valid Basic Authentication credentials.
 *
 * Required environment variables:
 * - BASIC_AUTH_USER: Expected username
 * - BASIC_AUTH_PASS: Expected password
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} _res - Express response object (unused)
 * @param {import('express').NextFunction} next - Express next function
 * @returns {void}
 *
 * @example
 * // Protect a route with basic auth
 * router.get('/protected', basicAuth, protectedHandler);
 */
export const basicAuth = (req, _res, next) => {
  try {
    const { username, password } = extractCredentials(req.headers.authorization);
    const { expectedUser, expectedPass } = getExpectedCredentials();

    validateCredentials(username, password, expectedUser, expectedPass);

    // Attach authenticated user to request for downstream use
    req.authUser = username;
    return next();
  } catch (error) {
    return next(error);
  }
};
