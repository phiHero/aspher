export default function FilmSchema(mongoose) {
  return new mongoose.Schema(
    {
      title: { type: String, required: true, unique: true },
      otherName: { type: String, required: false },
      like: { type: Array, default: [] },
      dislike: { type: Array, default: [] },
      followed: { type: Number, default: 0 },
      adminRecommended: { type: Boolean, default: false },
      genre: { type: Array },
      episode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
      year: { type: Number || String, required: true },
      desc: { type: String, required: true },
      backgroundImg: { type: String, required: true },
      trailer: { type: String, required: false },
      isMovie: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
}
