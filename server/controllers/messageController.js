import messageModel from "../models/messageModel.js"
import conversationModel from "../models/conversationModel.js"

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content, messageType = "text", fileUrl, fileName, fileSize } = req.body

    if (!conversationId || !senderId || !content) {
      return res.status(400).json({ error: "ConversationId, senderId, and content are required" })
    }

    // Verify conversation exists
    const conversation = await conversationModel.findById(conversationId)
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" })
    }

    // Create new message
    const newMessage = new messageModel({
      conversationId,
      senderId,
      content,
      messageType,
      fileUrl,
      fileName,
      fileSize,
      timestamp: new Date(),
    })

    const savedMessage = await newMessage.save()

    // Update conversation's last message
    conversation.lastMessage = {
      content,
      senderId,
      timestamp: savedMessage.timestamp,
    }
    conversation.updatedAt = new Date()
    await conversation.save()

    // Populate sender information
    await savedMessage.populate("senderId", "name avatar")

    res.status(201).json(savedMessage)
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: "Failed to send message" })
  }
}

// Get messages for a conversation
export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params
    const { page = 1, limit = 50 } = req.query

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID is required" })
    }

    const skip = (page - 1) * limit

    const messages = await messageModel
      .find({ conversationId })
      .populate("senderId", "name avatar")
      .populate("replyTo", "content senderId")
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    // Reverse to get chronological order
    const chronologicalMessages = messages.reverse()

    res.status(200).json({
      messages: chronologicalMessages,
      hasMore: messages.length === Number.parseInt(limit),
    })
  } catch (error) {
    console.error("Error fetching conversation messages:", error)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
}

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId, userId } = req.body

    if (!conversationId || !userId) {
      return res.status(400).json({ error: "ConversationId and userId are required" })
    }

    // Update messages that haven't been read by this user
    await messageModel.updateMany(
      {
        conversationId,
        senderId: { $ne: userId },
        $or: [{ status: { $ne: "read" } }, { readBy: { $not: { $elemMatch: { userId: userId } } } }],
      },
      {
        $addToSet: {
          readBy: {
            userId,
            readAt: new Date(),
          },
        },
        status: "read",
      },
    )

    res.status(200).json({ message: "Messages marked as read" })
  } catch (error) {
    console.error("Error marking messages as read:", error)
    res.status(500).json({ error: "Failed to mark messages as read" })
  }
}

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    const { userId } = req.body

    if (!messageId || !userId) {
      return res.status(400).json({ error: "Message ID and User ID are required" })
    }

    const message = await messageModel.findById(messageId)

    if (!message) {
      return res.status(404).json({ error: "Message not found" })
    }

    // Check if user is the sender
    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this message" })
    }

    await messageModel.findByIdAndDelete(messageId)

    // Update conversation's last message if this was the last message
    const conversation = await conversationModel.findById(message.conversationId)
    if (
      conversation &&
      conversation.lastMessage &&
      conversation.lastMessage.timestamp.getTime() === message.timestamp.getTime()
    ) {
      // Find the new last message
      const lastMessage = await messageModel.findOne({ conversationId: message.conversationId }).sort({ timestamp: -1 })

      if (lastMessage) {
        conversation.lastMessage = {
          content: lastMessage.content,
          senderId: lastMessage.senderId,
          timestamp: lastMessage.timestamp,
        }
      } else {
        conversation.lastMessage = null
      }

      await conversation.save()
    }

    res.status(200).json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Error deleting message:", error)
    res.status(500).json({ error: "Failed to delete message" })
  }
}
