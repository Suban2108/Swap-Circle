import mongoose from "mongoose"

// Schema for storing conversations between users or in groups
const conversationSchema = new mongoose.Schema(
  {
    // For one-to-one conversations
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // For group conversations
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "circle",
    },

    // Type of conversation
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },

    // Last message info for quick access
    lastMessage: {
      content: String,
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },

    // Conversation metadata
    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false },
)

// Index for efficient queries
conversationSchema.index({ participants: 1 })
conversationSchema.index({ groupId: 1 })
conversationSchema.index({ type: 1 })

const conversationModel = mongoose.models.conversation || mongoose.model("conversation", conversationSchema)

export default conversationModel
