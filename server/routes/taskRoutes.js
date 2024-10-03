// server\routes\taskRoutes.js

import express from 'express';
const router = express.Router();
import * as taskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// Route definitions using controller methods
router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/stats', authMiddleware, taskController.getTaskStats);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
