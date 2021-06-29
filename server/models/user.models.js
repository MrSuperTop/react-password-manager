import mongoose from 'mongoose';
import { credentialsSchema } from './credentials.model.js';

const userSchema = mongoose.Schema({
  name: String,
  email: { required: true, type: String },
  password: { required: true, type: String },
  credentials: { default: [], type: [credentialsSchema] }
});

export default mongoose.model('User', userSchema);
