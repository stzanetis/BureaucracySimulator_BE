import {
  deleteTaskForCurrentUser,
  getCoffeePaymentStatus,
  getCurrentToDoList,
  getTaskByIdForCurrentUser,
  payForCoffee,
  resetCoffeePayment,
  updateTaskStatus
} from '../services/taskService.js';
import { sendSuccess } from '../utils/responses.js';
import { getFormDefinition } from '../services/taskService.js';
import { updateFormTaskStatus } from '../services/taskService.js';

/**
 * GET /user/homescreen/todolist
 * Retrieve updated task list.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getToDoList = async (req, res, next) => {
  try {
    const data = await getCurrentToDoList();
    sendSuccess(res, data, 'To-do list retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /user/homescreen/tasks/:taskID/
 * Get a specific task.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskID);
    const task = await getTaskByIdForCurrentUser(taskId);
    sendSuccess(res, task, 'Task retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /user/homescreen/tasks/:taskID
 * Submit user input for a specific task and return completion status.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const putTaskCheck = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskID);
    const { userInput } = req.body;
    const isTaskCompleted = await updateTaskStatus(taskId, userInput);
    sendSuccess(res, { isTaskCompleted }, 'Task evaluated.');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /user/homescreen/tasks/:taskID
 * Non-OpenAPI endpoint for deleting a task from the to-do list.
 * Used to demonstrate DELETE and full CRUD.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const deleteTask = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskID);
    await deleteTaskForCurrentUser(taskId);
    sendSuccess(res, null, 'Task deleted.', 204);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /user/homescreen/tasks/9/payment-portal/
 * Get payment status for coffee task id=9.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getCoffeePaymentPortalStatus = async (req, res, next) => {
  try {
    const data = await getCoffeePaymentStatus();
    sendSuccess(res, data, 'Coffee payment status retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /user/homescreen/tasks/9/payment-portal/pay
 * Non-OpenAPI helper route to simulate paying for the coffee.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const payCoffee = async (req, res, next) => {
  try {
    const data = await payForCoffee();
    sendSuccess(res, data, 'Coffee payment completed.');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /user/homescreen/tasks/9/payment-portal/reset
 * Non-OpenAPI helper route to reset payment.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const resetCoffee = async (req, res, next) => {
  try {
    const data = await resetCoffeePayment();
    sendSuccess(res, data, 'Coffee payment reset.');
  } catch (error) {
    next(error);
  }
};

/**
 * FORM TASK:
 * GET /user/homescreen/tasks/:taskID/form
 * Retrieve form definition for a Form task. 
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const getTaskForm = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskID);
    const form = await getFormDefinition(taskId);
    sendSuccess(res, form, 'Form definition retrieved.');
  } catch (error) {
    next(error);
  }
};

/**
 * FORM TASK:
 * PUT /user/homescreen/tasks/:taskID/form-check
 * Submit user input and return completion status.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
export const putFormTaskCheck = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskID);
    const { userInput } = req.body;

    const isTaskCompleted = await updateFormTaskStatus(taskId, userInput);

    sendSuccess(res, { isTaskCompleted }, 'Form task evaluated.');
  } catch (error) {
    next(error);
  }
};