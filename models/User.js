import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    nickname: { type: String, required: true, trim: true },
    seed: { type: Number, required: true },
    toDoList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
