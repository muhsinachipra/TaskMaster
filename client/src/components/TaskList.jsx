import { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import PropTypes from 'prop-types';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between p-2 border-b">
                        <div>
                            <h3 className="text-xl">{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                        <div>
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
    onEdit: PropTypes.func.isRequired,
};

export default TaskList;
