// client/src/pages/Home.jsx

import { useState, useEffect, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { getTasks, getTaskStats } from '../api';
import TaskStats from '../components/TaskStats';

const API_URL = `${import.meta.env.VITE_API_URL}`;

const socket = io(API_URL);

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskStats, setTaskStats] = useState(null);
    const { logout } = useContext(AuthContext);

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const response = await getTasks(); // Fetch tasks from the API
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchStats = async () => {
            try {
                const response = await getTaskStats(); // Fetch task stats from api.js
                setTaskStats(response.data); // Set task statistics
            } catch (error) {
                console.error('Error fetching task stats:', error);
            }
        };

        fetchTasks();
        fetchStats();

        // Socket event listeners
        socket.on('taskCreated', (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            fetchStats(); // Update stats on task creation
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
            fetchStats(); // Update stats on task update
        });

        socket.on('taskDeleted', (deletedTaskId) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
            fetchStats(); // Update stats on task deletion
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

            {taskStats && <TaskStats stats={taskStats} />}
        </div>
    );
};

export default Home;