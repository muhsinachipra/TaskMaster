// server\server.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Replace with your frontend's URL in production
        methods: ['GET', 'POST'],
    }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use consistent route prefixes
app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};
connectDB();

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Export io to use in other files (controllers)
export { io };

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
