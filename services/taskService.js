import { coffeePaymentState, taskTemplates, users } from '../config/mockData.js';
import { AppError } from '../utils/helpers.js';
import { formTemplates } from '../config/mockData.js';

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
 * Retrieve a single task by ID (from current user's list).
 *
 * @param {number} taskId
 * @returns {Promise<any>}
 */
export const getTaskByIdForCurrentUser = async (taskId) => {
  const currentUser = users[users.length - 1];

  if (!currentUser) {
    throw new AppError('No active user found. Start a game first.', 404, 'NO_ACTIVE_USER');
  }

  const task = currentUser.toDoList.find((t) => t.id === taskId);
  if (!task) {
    throw new AppError('Task not found.', 404, 'NOT_FOUND');
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
 * @param {number} taskId
 * @returns {Promise<{formTitle: string, description: string, fields: Array}>}
 * @throws {AppError}
 */
export const getFormDefinition = async (taskId) => {
  const form = formTemplates[taskId];

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