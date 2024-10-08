// client\src\components\TaskList.jsx

import { updateTask, deleteTask } from '../api';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                            {/* Toggle completion when clicking on task title */}
                            <h3 
                                onClick={() => handleToggleComplete(task)} 
                                className={`text-xl cursor-pointer ${task.completed ? 'line-through' : ''}`}
                            >
                                {task.title}
                            </h3>
                            <p>{task.description}</p>
                        </div>
                        <div className="flex items-center">
                            {/* Edit Icon */}
                            <button onClick={() => onEdit(task)} className="mr-2 text-blue-500">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            {/* Delete Icon */}
                            <button onClick={() => handleDelete(task._id)} className="text-red-500">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
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
