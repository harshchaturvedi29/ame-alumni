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
    enum: ['mechanical', 'cse', 'electrical'],  //ask if other dept alumnis can also login
    default: 'mechanical'
  },
  batch: {
    type: Number,
    required: true,
    trim: true,

  },

  registrationNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: 10,

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


//hashing password before saving to database
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

export const User = (mongoose.models.users) || mongoose.model('User', userSchema);

