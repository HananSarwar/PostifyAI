const mongoose = require('mongoose')

const socialAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  platform: {
    type: String,
    enum: ['linkedin', 'twitter'],
    required: true,
  },
  platformUserId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: '',
  },
  tokenExpiry: {
    type: Date,
    default: null,
  },
  isConnected: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

// One account per platform per user
socialAccountSchema.index({ userId: 1, platform: 1 }, { unique: true })
module.exports = mongoose.model('SocialAccount', socialAccountSchema)