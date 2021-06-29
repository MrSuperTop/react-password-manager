import mongoose from 'mongoose';

export const credentialsSchema = mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  type: { required: true, type: String }
});

export default mongoose.model('Credentials', credentialsSchema);
