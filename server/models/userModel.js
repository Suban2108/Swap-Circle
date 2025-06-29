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

  phone: {
    type: String,
  },

  location: {
    type: String,
  },

  bio: {
    type: String,
  },

  website: {
    type: String,
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },

  avatar: {
    type: String,
    default:"/default/Default_user_image.jpeg"
  },

  coverImage: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  socialLinks: {
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },

  circleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'circle',
  },

  joinedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  }],

  karmaPoints: {
    type: Number,
    default: 0,
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
