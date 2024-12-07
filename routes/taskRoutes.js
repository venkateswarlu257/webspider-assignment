import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {addTask, getAllTasks, getTask, updateTask, deteleTask} from '../controllers/taskController.js'

const taskRouter = express.Router()

//API Routes For Tasks
taskRouter.post('/tasks',addTask) //adding the new task to db API
taskRouter.get('/tasks',getAllTasks) //getting all tasks fron the db API
taskRouter.get('/tasks/:id',getTask) //getting one task by id fron db API
taskRouter.put('/tasks/:id',updateTask) //updating one task by id fron db API
taskRouter.delete('/tasks/:id',deteleTask) //deleting one task by id from db API

export default taskRouter