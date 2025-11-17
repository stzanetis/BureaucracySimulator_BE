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

export default router;
