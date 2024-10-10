// server/controllers/taskController.js

import Task from '../models/Task.js';
import { io } from '../server.js';

// Create a new task
export const createTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, userId: req.user._id });
        await task.save();

        io.emit('taskCreated', task); // Emit real-time update for task creation
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const { search } = req.query; // Get search query from the request
        const userId = req.user._id;
        
        // Build the query object
        const query = { userId };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive search
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task by ID
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        io.emit('taskUpdated', task); // Emit real-time update for task update
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        io.emit('taskDeleted', task._id); // Emit real-time update for task deletion
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get task statistics
export const getTaskStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ userId });
        const completedTasks = await Task.countDocuments({ userId, completed: true });
        const overdueTasks = await Task.countDocuments({ userId, completed: false });

        // Count tasks by priority
        const highPriorityTasks = await Task.countDocuments({ userId, priority: 'High' });
        const mediumPriorityTasks = await Task.countDocuments({ userId, priority: 'Medium' });
        const lowPriorityTasks = await Task.countDocuments({ userId, priority: 'Low' });

        res.status(200).json({
            totalTasks,
            completedTasks,
            overdueTasks,
            highPriorityTasks,
            mediumPriorityTasks,
            lowPriorityTasks,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve task statistics' });
    }
};