import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DBconnection from './Configure/dbConfig.js';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors())
dotenv.config()

//DB connection
DBconnection()

//API Routes
app.use(taskRouter) //task API routes
app.use(userRouter) //user API routes

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});