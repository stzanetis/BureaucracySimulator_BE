/**
 * Lightweight request logger (in addition to morgan).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export const requestLogger = (req, _, next) => {
  // eslint-disable-next-line no-console
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} (auth: ${
      req.authUser || 'anonymous'
    })`
  );
  next();
};
