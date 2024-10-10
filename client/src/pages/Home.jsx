// client\src\pages\Home.jsx

import { useState, useEffect, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { getTasks, getTaskStats } from '../api';
import TaskStats from '../components/TaskStats';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const API_URL = `${import.meta.env.VITE_API_URL}`;

const socket = io(API_URL);

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskStats, setTaskStats] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const [loadingTasks, setLoadingTasks] = useState(true); // Loading state for tasks
    const [loadingStats, setLoadingStats] = useState(true); // Loading state for stats

    useEffect(() => {
        const fetchTasks = async () => {
            setLoadingTasks(true); // Start loading
            try {
                const response = await getTasks();
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoadingTasks(false); // End loading
            }
        };

        const fetchStats = async () => {
            setLoadingStats(true); // Start loading
            try {
                const response = await getTaskStats();
                setTaskStats(response.data);
            } catch (error) {
                console.error('Error fetching task stats:', error);
            } finally {
                setLoadingStats(false); // End loading
            }
        };

        fetchTasks();
        fetchStats();

        // Socket event listeners
        socket.on('taskCreated', (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            fetchStats(); 
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
            fetchStats(); 
        });

        socket.on('taskDeleted', (deletedTaskId) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
            fetchStats();
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, []);

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        logout();
    };

    const handleAddTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
                >
                    Logout
                </button>
            </div>
    
            {/* Add Task Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleAddTask}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                    Add Task
                </button>
            </div>
    
            {/* Layout for Task List and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task List */}
                {loadingTasks ? (
                    <div className="flex justify-center items-center col-span-1">
                        <ClipLoader size={35} color={"#3498db"} loading={loadingTasks} />
                    </div>
                ) : (
                    <TaskList tasks={tasks} onEdit={handleEdit} />
                )}
    
                {/* Task Stats */}
                {loadingStats ? (
                    <div className="flex justify-center items-center col-span-1">
                        <ClipLoader size={35} color={"#3498db"} loading={loadingStats} />
                    </div>
                ) : (
                    taskStats && (
                        <div className="mt-6 lg:mt-0">
                            <TaskStats stats={taskStats} />
                        </div>
                    )
                )}
            </div>
    
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg mx-auto">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg float-right mb-4"
                        >
                            Close
                        </button>
                        <TaskForm selectedTask={selectedTask} onSave={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
