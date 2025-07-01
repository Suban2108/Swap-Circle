import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String // URLs of uploaded images
  }],
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['donate', 'barter'],
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'exchanged', 'removed'],
    default: 'available'
  },
  deliveryNotes: {
    type: String
  }
}, {
  timestamps: true
})

const itemModel = mongoose.models.item || mongoose.model('item', itemSchema)
export default itemModel
