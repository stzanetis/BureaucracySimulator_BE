import { createUserWithTasks, getAllUsers } from '../services/userService.js';
import { sendSuccess } from '../utils/responses.js';

/**
 * POST /user/
 * Submit nickname and seed to get to-do list.
 * Matches OpenAPI /user/ spec.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const postUserHomeScreen = async (req, res, next) => {
  try {
    const { nickname, seed } = req.body;
    const user = await createUserWithTasks(nickname, Number(seed));
    sendSuccess(res, user, 'User created and to-do list generated.', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /user/
 * Non-OpenAPI helper route to inspect all mock users.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getUsers = async (req, res, next) => {
  try {
    const data = await getAllUsers();
    sendSuccess(res, data, 'Users retrieved.');
  } catch (error) {
    next(error);
  }
};
