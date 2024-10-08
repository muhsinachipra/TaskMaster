// server/server.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : '*';

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/tasks', taskRoutes);
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

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('someEvent', (data) => {
        console.log('Data received:', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export { io };

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
