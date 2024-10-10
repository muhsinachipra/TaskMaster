// client\src\api.js

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

const getAuthToken = () => localStorage.getItem('token');

export const getTasks = () => axios.get(API_URL, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});

export const createTask = (task) => axios.post(API_URL, task, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});

export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});

export const getTaskStats = () => axios.get(`${API_URL}/stats`, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});

export const searchTasks = (query) => axios.get(`${API_URL}?search=${encodeURIComponent(query)}`, {
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
    },
});