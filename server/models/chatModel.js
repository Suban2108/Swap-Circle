import mongoose from 'mongoose';

// Schema for storing chat chats between users or in group
const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'circle' // Group chats linked to a circle or group
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  },
  content: {
    type: String,
    required: true
  },
  file: {
    name: String,
    url: String,
    type: String,
    size: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
}, { minimize: false });

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default chatModel;
