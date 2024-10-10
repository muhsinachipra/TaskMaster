// server\models\task.js

import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String, enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Task = model('Task', taskSchema);
export default Task
