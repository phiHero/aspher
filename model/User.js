export default function UserSchema(mongoose) {
  return new mongoose.Schema(
    {
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePic: { type: String, default: '' },
      customColor: { type: String, default: '#008048' },
      isAdmin: { type: Boolean, default: false },
      followedFilm: { type: Array, default: [] },
    },
    { timestamps: true }
  );
}
