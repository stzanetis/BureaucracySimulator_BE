import {
  BASIC_AUTH_DEFAULT_PASS,
  BASIC_AUTH_DEFAULT_USER
} from '../config/constants.js';
import { AppError } from '../utils/helpers.js';

/**
 * Simple Basic Authentication middleware.
 * All routes behind this middleware require:
 *   Authorization: Basic base64(username:password)
 *
 * Default credentials come from env or constants.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const basicAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Basic ')) {
      throw new AppError('Missing Authorization header.', 401, 'AUTH_REQUIRED');
    }

    const base64Credentials = header.split(' ')[1];
    const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');

    const expectedUser = process.env.BASIC_AUTH_USER || BASIC_AUTH_DEFAULT_USER;
    const expectedPass = process.env.BASIC_AUTH_PASS || BASIC_AUTH_DEFAULT_PASS;

    if (username !== expectedUser || password !== expectedPass) {
      throw new AppError('Invalid credentials.', 401, 'AUTH_INVALID');
    }

    // Attach auth info to request for logging/debugging
    req.authUser = username;
    return next();
  } catch (error) {
    return next(error);
  }
};
