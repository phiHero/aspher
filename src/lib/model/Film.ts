import mongoose from 'mongoose';
import FilmSchema from '../../../../model/Film';

export default mongoose.models.Film ||
  mongoose.model('Film', FilmSchema(mongoose));
