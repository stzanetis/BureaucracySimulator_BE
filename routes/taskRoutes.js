/**
 * @fileoverview Task-related route definitions.
 * Handles all endpoints for task management, including specialized
 * routes for form tasks, puzzle tasks, and the coffee payment portal.
 * @module routes/taskRoutes
 */

import { Router } from 'express';
import {
  deleteTask,
  getCoffeePaymentPortalStatus,
  getTaskById,
  getToDoList,
  payCoffee,
  putTaskCheck,
  resetCoffee,
  getFormTask,
  putFormTaskCheck,
  getPuzzleTask,
  putPuzzleTaskCheck
} from '../controllers/taskController.js';
import { validateTaskUpdate } from '../middleware/validation.js';

const router = Router();

/**
 * Registers core task CRUD routes.
 * @param {Router} taskRouter - Express router instance
 */
const registerCoreTaskRoutes = (taskRouter) => {
  /** @route GET /user/homescreen/todolist - Retrieve user's task list */
  taskRouter.get('/homescreen/todolist', getToDoList);

  /** @route GET /user/homescreen/tasks/:taskID - Get task by ID */
  taskRouter.get('/homescreen/tasks/:taskID/', getTaskById);

  /** @route PUT /user/homescreen/tasks/:taskID - Update task completion */
  taskRouter.put('/homescreen/tasks/:taskID', validateTaskUpdate, putTaskCheck);

  /** @route DELETE /user/homescreen/tasks/:taskID - Remove a task */
  taskRouter.delete('/homescreen/tasks/:taskID', deleteTask);
};

/**
 * Registers coffee task payment portal routes.
 * @param {Router} taskRouter - Express router instance
 */
const registerCoffeePaymentRoutes = (taskRouter) => {
  const basePath = '/homescreen/tasks/9/payment-portal';

  /** @route GET /user/homescreen/tasks/9/payment-portal - Get payment status */
  taskRouter.get(`${basePath}/`, getCoffeePaymentPortalStatus);

  /** @route POST /user/homescreen/tasks/9/payment-portal/pay - Process payment */
  taskRouter.post(`${basePath}/pay`, payCoffee);

  /** @route POST /user/homescreen/tasks/9/payment-portal/reset - Reset payment */
  taskRouter.post(`${basePath}/reset`, resetCoffee);
};

/**
 * Registers form task routes.
 * @param {Router} taskRouter - Express router instance
 */
const registerFormTaskRoutes = (taskRouter) => {
  /** @route GET /user/homescreen/tasks/:taskID/form - Get form template */
  taskRouter.get('/homescreen/tasks/:taskID/form', getFormTask);

  /** @route PUT /user/homescreen/tasks/:taskID/form-check - Validate form */
  taskRouter.put('/homescreen/tasks/:taskID/form-check', putFormTaskCheck);
};

/**
 * Registers puzzle task routes.
 * @param {Router} taskRouter - Express router instance
 */
const registerPuzzleTaskRoutes = (taskRouter) => {
  /** @route GET /user/homescreen/tasks/:taskID/puzzle - Get puzzle data */
  taskRouter.get('/homescreen/tasks/:taskID/puzzle', getPuzzleTask);

  /** @route PUT /user/homescreen/tasks/:taskID/puzzle-check - Validate answer */
  taskRouter.put('/homescreen/tasks/:taskID/puzzle-check', putPuzzleTaskCheck);
};

// Register all route groups
registerCoreTaskRoutes(router);
registerCoffeePaymentRoutes(router);
registerFormTaskRoutes(router);
registerPuzzleTaskRoutes(router);

export default router;
