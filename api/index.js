import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRotes from './routes/comment.route.js';
import messageOfMainChat from './routes/messageOfMainChat.route.js';
import cookieParser from 'cookie-parser';
import path from "path";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {console.log('mongo conected')}).catch(err => {console.log(err)});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRotes);
app.use('/api/messageOfMainChat', messageOfMainChat);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Iternal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "https://mern-blog-uwsq.onrender.com",
      methods: ["GET", "POST"],
    },
});
  
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
server.listen(3002, () => {
    console.log("SERVER RUNNING");
});
  