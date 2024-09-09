// user.model.js
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['alumni', 'student', 'faculty'],
    default: 'alumni'
  },
  department: {
    type: String,
    enum: ['mechanical'],
    default: 'mechanical'
  },
  batch: {
    type: Number,
    required: true,
    trim: true,

  },
  profilePicture: {
    type: String  //cloudinary url
  },
  bio: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;