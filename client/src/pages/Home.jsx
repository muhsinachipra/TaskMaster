import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEdit = (task) => {
        setSelectedTask(task);
    };

    const handleSave = () => {
        setSelectedTask(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Task Manager</h1>
            <TaskForm selectedTask={selectedTask} onSave={handleSave} />
            <TaskList onEdit={handleEdit} />
        </div>
    );
};

export default Home;
