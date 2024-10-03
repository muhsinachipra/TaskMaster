// client\src\components\TaskList.jsx

import { updateTask, deleteTask } from '../api';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onEdit }) => {

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    const handleToggleComplete = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(task._id, updatedTask); // Call API to update task completion
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between p-2 border-b">
                        <div>
                            <h3 className={`text-xl ${task.completed ? 'line-through' : ''}`}>
                                {task.title}
                            </h3>
                            <p>{task.description}</p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task)} // Toggle completion
                                className="mr-2"
                            />
                            <button onClick={() => onEdit(task)} className="mr-2 text-blue-500">Edit</button>
                            <button onClick={() => handleDelete(task._id)} className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default TaskList;
