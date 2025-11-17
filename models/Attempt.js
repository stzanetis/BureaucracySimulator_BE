import mongoose from 'mongoose';

const { Schema } = mongoose;

const attemptSchema = new Schema(
  {
    nickname: { type: String, required: true },
    elapsedTime: { type: Number, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Attempt = mongoose.models.Attempt || mongoose.model('Attempt', attemptSchema);
