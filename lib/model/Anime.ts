import mongoose from 'mongoose';

const AnimeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] },
    isRecommended: { type: Boolean, default: false },
    genre: { type: Array },
    episode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
    year: { type: Number },
    desc: { type: String },
    titleImg: { type: String },
    backgroundImg: { type: String },
    trailer: { type: String },
    isMovie: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.models.Anime || mongoose.model('Anime', AnimeSchema);
