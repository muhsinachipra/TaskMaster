// client\src\components\TaskForm.jsx

import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';
import PropTypes from 'prop-types';

const TaskForm = ({ selectedTask, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask);
        } else {
            setTask({ title: '', description: '' });
        }
    }, [selectedTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task._id) {
            await updateTask(task._id, task);
        } else {
            await createTask(task);
        }
        onSave();
        // Clear the form after task is saved
        setTask({ title: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full p-2 mb-2 border"
            />
            <textarea
                placeholder="Task Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="w-full p-2 mb-2 border"
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                {task._id ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

TaskForm.propTypes = {
    selectedTask: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};

export default TaskForm;
