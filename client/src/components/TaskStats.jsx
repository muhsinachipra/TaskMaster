// client\src\components\TaskStats.jsx

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF6347', '#4682B4'];

const TaskStats = ({ stats }) => {
    const data = [
        { name: 'Total Tasks', value: stats.totalTasks },
        { name: 'Completed Tasks', value: stats.completedTasks },
        { name: 'Overdue Tasks', value: stats.overdueTasks },
        { name: 'High Priority Tasks', value: stats.highPriorityTasks },
        { name: 'Medium Priority Tasks', value: stats.mediumPriorityTasks },
        { name: 'Low Priority Tasks', value: stats.lowPriorityTasks },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-2xl mb-4">Task Statistics</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

TaskStats.propTypes = {
    stats: PropTypes.shape({
        totalTasks: PropTypes.number.isRequired,
        completedTasks: PropTypes.number.isRequired,
        overdueTasks: PropTypes.number.isRequired,
        highPriorityTasks: PropTypes.number.isRequired,
        mediumPriorityTasks: PropTypes.number.isRequired,
        lowPriorityTasks: PropTypes.number.isRequired,
    }).isRequired,
};

export default TaskStats;
