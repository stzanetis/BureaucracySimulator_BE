import { coffeePaymentState, taskTemplates, users } from '../config/mockData/index.js';
import { CAPTCHAs } from '../config/mockData/index.js'
import { AppError } from '../utils/helpers.js';
import { formTemplate, puzzleTemplates } from '../config/mockData/index.js';

/**
 * Retrieve the current user's to-do list.
 * For simplicity, we assume the last created user is the active one.
 *
 * @returns {Promise<{toDoList: any[]}>}
 */
export const getCurrentToDoList = async () => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  return { toDoList: currentUser.toDoList };
};

/**
 * Retrieve a single task by ID (from current user's list or global templates).
 * If it's a CAPTCHA task, attach a random CAPTCHA challenge.
 *
 * @param {number} taskId
 * @returns {Promise<any>}
 */
export const getTaskByIdForCurrentUser = async (taskId) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  // First, try to find the task in the user's toDoList
  let task = currentUser.toDoList.find((t) => t.id === taskId);
  
  // If not found in user's list, look in global task templates
  if (!task) {
    task = taskTemplates.find((t) => t.id === taskId);
  }
  
  // If still not found, throw error
  if (!task) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
  }

  // If this is a CAPTCHA task, attach a random CAPTCHA challenge
  if (task.taskType === 'CAPTCHA' && CAPTCHAs.length > 0) {
    const randomCaptcha = CAPTCHAs[Math.floor(Math.random() * CAPTCHAs.length)];
    return {
      ...task,
      captcha: randomCaptcha
    };
  }

  return task;
};

/**
 * Update a task with user input and compute completion status.
 * The "inconvenient" logic here is deliberately arbitrary but deterministic:
 *  - If the length of JSON.stringify(userInput) is even, the task is complete.
 *
 * @param {number} taskId
 * @param {any} userInput
 * @returns {Promise<boolean>} whether task is completed
 */
export const updateTaskStatus = async (taskId, userInput) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  const taskIndex = currentUser.toDoList.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
  }

  const serialized = JSON.stringify(userInput);
  const isTaskCompleted = serialized.length % 2 === 0;

  currentUser.toDoList[taskIndex].completed = isTaskCompleted;

  return isTaskCompleted;
};

/**
 * Delete a task from the current user's to-do list.
 *
 * @param {number} taskId
 * @returns {Promise<void>}
 */
export const deleteTaskForCurrentUser = async (taskId) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  const index = currentUser.toDoList.findIndex((t) => t.id === taskId);
  if (index === -1) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
  }

  currentUser.toDoList.splice(index, 1);
};

/**
 * Retrieve the payment status for Coffee Task (task id=9).
 *
 * @returns {Promise<{paymentAccepted: boolean}>}
 */
export const getCoffeePaymentStatus = async () => {
  return { paymentAccepted: coffeePaymentState.paymentAccepted };
};

/**
 * Simulate paying for the coffee (non-OpenAPI extra route).
 *
 * @returns {Promise<{paymentAccepted: boolean}>}
 */
export const payForCoffee = async () => {
  coffeePaymentState.paymentAccepted = true;
  return { paymentAccepted: true };
};

/**
 * Reset coffee payment status (useful for tests).
 *
 * @returns {Promise<{paymentAccepted: boolean}>}
 */
export const resetCoffeePayment = async () => {
  coffeePaymentState.paymentAccepted = false;
  return { paymentAccepted: false };
};

/**
 * FORM TASK:
 * Retrieve the form configuration.
 * 
 * @returns {Promise<{formTitle: string, description: string, fields: Array}>}
 * @throws {AppError}
 */
export const getFormDefinition = async () => {
  const form = formTemplate;

  if (!form) {
    throw new AppError('No form found for this task.', 404, 'FORM_NOT_FOUND');
  }

  return {
    formTitle: form.title,
    description: form.description,
    fields: form.fields
  };
};

/**
 * FORM TASK:
 * Update task with user input and compute completion status.
 *
 * @param {number} taskId
 * @param {any} userInput
 * @returns {Promise<boolean>}
 */
export const updateFormTaskStatus = async (taskId, userInput) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  const taskIndex = currentUser.toDoList.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
  }

  const serialized = JSON.stringify(userInput);
  const isTaskCompleted = serialized.length % 2 === 0;

  currentUser.toDoList[taskIndex].completed = isTaskCompleted;

  return isTaskCompleted;
};

/**
 * PUZZLE TASK:
 * Retrieve the puzzle configuration.
 * 
 * @param {number} taskId
 * @returns {Promise<any>}
 * @throws {AppError}
 */
export const getPuzzleDefinition = async () => {
  const PUZZLE_COUNT = 2;

  const shuffled = [...puzzleTemplates].sort(() => Math.random() - 0.5);

  const puzzles = shuffled.slice(0, PUZZLE_COUNT).map((p, idx) => ({
    id: idx + 1,
    ...p
  }));

  return { puzzles };
};


/**
 * Puzzle TASK:
 * Update task with user input and compute completion status.
 *
 * @param {number} taskId
 * @param {object} puzzleAnswer - Object containing puzzleKey and answer
 * @param {string} puzzleAnswer.puzzleKey
 * @param {any} puzzleAnswer.answer
 * @returns {Promise<boolean>}
 */
export const updatePuzzleTaskStatus = async (taskId, puzzleAnswer) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  const taskIndex = currentUser.toDoList.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
  }

  const puzzle = puzzleTemplates.find(p => p.puzzleKey === puzzleAnswer.puzzleKey);
  if (!puzzle) {
    throw new AppError(`Puzzle key '${puzzleAnswer.puzzleKey}' not found`, 404, "NO_PUZZLE");
  }

  const answer = String(puzzleAnswer.answer);
  const correct = String(puzzle.correctAnswer);

  const isTaskCompleted = answer === correct;

  currentUser.toDoList[taskIndex].completed = isTaskCompleted;

  return isTaskCompleted;
};