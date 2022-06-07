import mongoose from 'mongoose';

const AnimeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    otherName: { type: String, required: false, trim: true },
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] },
    followed: { type: Number, default: 0 },
    adminRecommended: { type: Boolean, default: false },
    genre: { type: Array },
    episode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
    year: { type: Number, required: true },
    desc: { type: String, required: true },
    backgroundImg: { type: String, required: true, trim: true },
    trailer: { type: String, required: true, trim: true },
    isMovie: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.models.Anime || mongoose.model('Anime', AnimeSchema);
