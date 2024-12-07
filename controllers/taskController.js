import Joi from 'joi'
import Task from '../Models/taskModel.js';

// Joi Task Validation Schema
const taskValidationSchema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().optional(),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').default('TODO'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
    dueDate: Joi.date().optional(),
  });

// POST Controller Add a Task
const addTask = async (request,response) => {
    try{
        const validatedTask = await taskValidationSchema.validateAsync(request.body);
        const task = new Task(validatedTask);
        const savedTask = await task.save();
        response.status(201).json({ message: 'Task created successfully', task: savedTask});
    }catch(error){
        response.status(400).json({ error: error.message });
    }
}

// GET Controller Getting All Tasks 
const getAllTasks = async (request, response) => {
    try {
      const { status, priority, sort = 'createdAt', order = 'asc', limit = 10, skip = 0 } = request.query;
      const filter = {};
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      const sortOrder = order === 'desc' ? -1 : 1;
      const tasks = await Task.find(filter)
        .sort({ [sort]: sortOrder })
        .limit(parseInt(limit)) 
        .skip(parseInt(skip));
      if(!tasks){
        response.status(404).json({message:"Task not found"})
      }
      response.status(200).json(tasks);
    } catch (error) {
      response.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  }

// GET Controller Getting One Task By Id
const getTask = async (request, response) => {
    try {
      const { id } = request.params;
      const task = await Task.findById({_id:id});
      if (!task) {
        return response.status(404).json({ error: 'Task not found' });
      }
      response.status(200).json(task);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve task' });
    }
}

// PUT Controller One Task By Id
const updateTask =  async (request, response) => {
    try {
      const { id } = request.params;
      const updates = request.body;
      const validatedUpdates = await taskValidationSchema.validateAsync(updates, { abortEarly: false });
      const updatedTask = await Task.findByIdAndUpdate(id, validatedUpdates, { new: true });
      if (!updatedTask) {
        return response.status(404).json({ error: 'Task not found' });
      }
      response.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      response.status(500).json({ error: 'Failed to update task' });
    }
  }

// DELETE Controller Deleting One Task By Id
const deteleTask = async (request, response) => {
    try {
      const { id } = request.params;
      const deletedTask = await Task.findByIdAndDelete({_id:id});
      if (!deletedTask) {
        return response.status(404).json({ error: 'Task not found' });
      }
      response.status(204).json({ message: 'Task delete successfully' });
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete task' });
    }
}

export {addTask, getAllTasks, getTask, updateTask, deteleTask}