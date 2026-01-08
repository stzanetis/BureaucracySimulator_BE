import { getAboutUsText } from '../services/aboutService.js';
import { sendSuccess } from '../utils/responses.js';

/**
 * GET /about-us/
 * Returns About Us paragraph.
 *
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getAboutUs = async (_req, res, next) => {
  try {
    const paragraph = await getAboutUsText();
    sendSuccess(res, { paragraph }, 'About Us content retrieved.');
  } catch (error) {
    next(error);
  }
};
