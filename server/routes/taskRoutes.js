// server\routes\taskRoutes.js

import express from 'express';
const router = express.Router();
import * as taskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// Route definitions using controller methods
router.post('/tasks', authMiddleware, taskController.createTask);
router.get('/tasks', authMiddleware, taskController.getAllTasks);
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);
router.put('/tasks/:id', authMiddleware, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

export default router;
