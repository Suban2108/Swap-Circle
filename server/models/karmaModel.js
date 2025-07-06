import mongoose from 'mongoose'

// Logs each karma change per user
const karmaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { minimize: false })

const karmaModel = mongoose.models.karma || mongoose.model('karma', karmaSchema)
export default karmaModel
