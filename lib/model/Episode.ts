import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    thumbnail: { type: String },
    desc: { type: String },
    anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Episode', EpisodeSchema);
