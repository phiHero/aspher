import mongoose from 'mongoose';
import UserSchema from '../../../../model/User';

export default mongoose.models.User ||
  mongoose.model('User', UserSchema(mongoose));
