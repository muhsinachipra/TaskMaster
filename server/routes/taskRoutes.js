// server\routes\taskRoutes.js

import express from 'express';
const router = express.Router();
import * as taskController from '../controllers/taskController.js';

// Route definitions using controller methods
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;
