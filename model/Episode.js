export default function EpisodeSchema(mongoose) {
  return new mongoose.Schema(
    {
      name: { type: String || Number, required: true, trim: true },
      video: { type: String, required: true, trim: true },
      subtitle: { type: String, required: false, trim: true },
      belongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true,
        trim: true,
      },
    },
    { timestamps: true }
  );
}
