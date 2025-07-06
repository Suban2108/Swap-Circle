import mongoose from "mongoose"

// Schema for individual messages within conversations
const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file", "audio", "video"],
      default: "text",
    },

    // For file messages
    fileUrl: String,
    fileName: String,
    fileSize: Number,

    // Message status
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },

    // Read by (for group chats)
    readBy: [
      {
        UserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    timestamp: {
      type: Date,
      default: Date.now,
    },

    // For replies/threads
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { minimize: false },
)

// Index for efficient queries
messageSchema.index({ conversationId: 1, timestamp: 1 })
messageSchema.index({ senderId: 1 })

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema)

export default messageModel
