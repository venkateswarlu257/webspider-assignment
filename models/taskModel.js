import mongoose from 'mongoose';

// Mongoose Schema and Model for Tasks
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String },
    status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'], default: 'TODO' },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] },
    dueDate: { type: Date },
  },{ timestamps: true });

const Task = mongoose.model('Task', taskSchema, "taskes");

export default Task