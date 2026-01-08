import mongoose from 'mongoose';

const { Schema } = mongoose;

const leaderboardEntrySchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
