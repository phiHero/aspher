import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    customColor: { type: String, default: '#008048' },
    isAdmin: { type: Boolean, default: false },
    followedAnime: { type: Array, default: [] },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model('User', UserSchema);
