// client/src/pages/Home.jsx

import { useState, useEffect, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { getTasks } from '../api';

const API_URL = `${import.meta.env.VITE_API_URL}`;

const socket = io(API_URL);

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        
        const fetchTasks = async () => {
            try {
                const response = await getTasks(); // Uses the getTasks function
                setTasks(response.data); // Axios automatically parses JSON
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();

        // Socket event listeners
        socket.on('taskCreated', (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prevTasks) => prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            ));
        });

        socket.on('taskDeleted', (deletedTaskId) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
        });

        // Cleanup listeners when component unmounts
        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, []);

    const handleEdit = (task) => {
        setSelectedTask(task);
    };

    const handleSave = () => {
        setSelectedTask(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            <TaskForm selectedTask={selectedTask} onSave={handleSave} />
            <TaskList tasks={tasks} onEdit={handleEdit} />
        </div>
    );
};

export default Home;