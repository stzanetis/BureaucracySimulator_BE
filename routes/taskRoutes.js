import { Router } from 'express';
import {
  deleteTask,
  getCoffeePaymentPortalStatus,
  getTaskById,
  getToDoList,
  payCoffee,
  putTaskCheck,
  resetCoffee
} from '../controllers/taskController.js';
import { validateTaskUpdate } from '../middleware/validation.js';
import { getFormTask, putFormTaskCheck } from '../controllers/taskController.js';
import { getPuzzleTask, putPuzzleTaskCheck } from '../controllers/taskController.js';

const router = Router();

/**
 * GET /user/homescreen/todolist
 */
router.get('/homescreen/todolist', getToDoList);

/**
 * GET /user/homescreen/tasks/:taskID/
 * PUT /user/homescreen/tasks/:taskID
 * DELETE /user/homescreen/tasks/:taskID
 */
router.get('/homescreen/tasks/:taskID/', getTaskById);
router.put('/homescreen/tasks/:taskID', validateTaskUpdate, putTaskCheck);
router.delete('/homescreen/tasks/:taskID', deleteTask);

/**
 * GET /user/homescreen/tasks/9/payment-portal/
 * Non-OpenAPI helpers:
 *   POST /user/homescreen/tasks/9/payment-portal/pay
 *   POST /user/homescreen/tasks/9/payment-portal/reset
 */
router.get('/homescreen/tasks/9/payment-portal/', getCoffeePaymentPortalStatus);
router.post('/homescreen/tasks/9/payment-portal/pay', payCoffee);
router.post('/homescreen/tasks/9/payment-portal/reset', resetCoffee);

/** 
 * FORM TASK:
 * GET /user/homescreen/tasks/:taskID/form
 */
router.get('/homescreen/tasks/:taskID/form', getFormTask);

/**
 * FORM TASK:
 * PUT /user/homescreen/tasks/:taskID/form-check
 */
router.put('/homescreen/tasks/:taskID/form-check', putFormTaskCheck);

/** 
 * PUZZLE TASK:
 * GET /user/homescreen/tasks/:taskID/puzzle
 */
router.get("/homescreen/tasks/:taskID/puzzle", getPuzzleTask);

/**
 * PUZZLE TASK:
 * PUT /user/homescreen/tasks/:taskID/puzzle-check
 */
router.put("/homescreen/tasks/:taskID/puzzle-check", putPuzzleTaskCheck);

export default router;
