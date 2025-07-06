// models/reuseModel.js
import mongoose from 'mongoose'

const reuseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  circleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'circle',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  estimatedWasteDivertedKg: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const reuseModel = mongoose.models.reuse || mongoose.model('reuse', reuseSchema)
export default reuseModel
