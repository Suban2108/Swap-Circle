import mongoose from 'mongoose';

// Schema for storing chat messages between users in a swap or donation context
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true // Who sent the message
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true // Who received the message
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item' // Optional: item being discussed
    },
    content: {
        type: String,
        required: true // Actual chat text
    },
    timestamp: {
        type: Date,
        default: Date.now // When message was sent
    },
    read: {
        type: Boolean,
        default: false // For unread message indicators
    }
}, { minimize: false });

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema);
export default messageModel;
