import mongoose from 'mongoose';
import EpisodeSchema from '../../../../model/Episode';

export default mongoose.models.Episode ||
  mongoose.model('Episode', EpisodeSchema(mongoose));
