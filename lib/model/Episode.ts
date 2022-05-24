import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema(
  {
    tap: { type: String || Number, required: true, unique: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    desc: { type: String },
    belongTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anime',
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Episode ||
  mongoose.model('Episode', EpisodeSchema);
