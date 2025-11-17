import { users, taskTemplates } from '../config/mockData.js';
import { createSeededRng } from '../utils/helpers.js';

/**
 * Create a user with a deterministic to-do list based on seed.
 *
 * @param {string} nickname
 * @param {number} seed
 * @returns {Promise<{id: number, nickname: string, seed: number, toDoList: any[]}>}
 */
export const createUserWithTasks = async (nickname, seed) => {
  const rng = createSeededRng(seed);
  const shuffledTemplates = taskTemplates
    .slice()
    .sort(() => rng() - 0.5);

  const toDoList = shuffledTemplates.slice(0, 4).map((t) => ({
    ...t,
    completed: false
  }));

  const newUser = {
    id: users.length + 1,
    nickname: nickname.trim(),
    seed: Number(seed),
    toDoList
  };

  users.push(newUser);
  return newUser;
};

/**
 * Get all users (mock).
 *
 * @returns {Promise<any[]>}
 */
export const getAllUsers = async () => {
  await Promise.resolve();
  return users;
};

/**
 * Get a user by id.
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
export const getUserById = async (id) => {
  await Promise.resolve();
  return users.find((u) => u.id === id) || null;
};
