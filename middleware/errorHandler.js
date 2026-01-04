import mongoose from 'mongoose';

/**
 * 404 handler for unmatched routes.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.originalUrl} not found.`
  });
};

/**
 * Centralized error-handling middleware.
 * Differentiates between validation, auth, not-found, Mongoose, and unknown errors.
 *
 * @param {any} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const errorHandler = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error('Error:', err);

  let statusCode = err.statusCode || 500;
  let errorCode = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'Internal server error';

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorCode = 'DB_VALIDATION_ERROR';
    message = err.message;
  }

  // Handle Mongoose cast errors (invalid ObjectId, etc.)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    errorCode = 'DB_CAST_ERROR';
    message = 'Invalid identifier format.';
  }

  // Fallback for unknown errors
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Something went wrong.';
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    error: errorCode,
    message
  });
};
