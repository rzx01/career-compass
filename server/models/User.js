import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
    default: "N/A",  
  },
  job: {
    type: String,
    required: true,
    default: "N/A",  
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
