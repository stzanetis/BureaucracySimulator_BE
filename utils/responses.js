/**
 * Send a standardized success JSON response.
 *
 * @param {import('express').Response} res
 * @param {any} data
 * @param {string} [message]
 * @param {number} [statusCode]
 * @returns {import('express').Response}
 */
export const sendSuccess = (res, data, message = 'OK', statusCode = 200) =>
  res.status(statusCode).json({
    success: true,
    data,
    error: null,
    message
  });
