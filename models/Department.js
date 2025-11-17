import mongoose from 'mongoose';

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    pageName: { type: String, required: true }
  },
  { timestamps: true }
);

export const Department =
  mongoose.models.Department || mongoose.model('Department', departmentSchema);
