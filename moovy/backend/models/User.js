// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchedMovies: { type: Array, default: [] } // pour ton addWatchedMovie
});

export default mongoose.model('User', userSchema);
