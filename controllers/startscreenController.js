import { getSongList } from '../services/startscreenService.js';
import { sendSuccess } from '../utils/responses.js';

/**
 * GET /startscreen/
 * Returns a list of song URLs.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getStartscreen = async (_req, res, next) => {
  try {
    const songlist = await getSongList();
    sendSuccess(res, { songlist }, 'Startscreen song list retrieved.');
  } catch (error) {
    next(error);
  }
};
