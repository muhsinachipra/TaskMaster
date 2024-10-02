// client/src/pages/Home.jsx

import { useState, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const { logout } = useContext(AuthContext); // Access logout function from AuthContext

    const handleEdit = (task) => {
        setSelectedTask(task);
    };

    const handleSave = () => {
        setSelectedTask(null);
    };

    const handleLogout = () => {
        logout(); // Call the logout function when the button is clicked
        // Optionally, you can redirect to the login page after logout
        window.location.href = '/login'; 
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
            <TaskList onEdit={handleEdit} />
        </div>
    );
};

export default Home;
