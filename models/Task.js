import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskType: { type: String, required: true },
    completed: { type: Boolean, default: false },
    pageName: { type: String, required: true },
    meta: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
