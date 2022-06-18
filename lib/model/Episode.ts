import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema(
  {
    tap: { type: String || Number, required: true },
    fbID: { type: String, required: false },
    dlId: { type: String, required: false },
    cdn: { type: String, required: false },
    thumbnail: { type: String, required: false },
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
