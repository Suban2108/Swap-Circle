import conversationModel from "../models/conversationModel.js"
import messageModel from "../models/messageModel.js"
import circleModel from "../models/circleModel.js"

// Get or create conversation between two users
export const getOrCreateDirectConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body

    if (!userId1 || !userId2) {
      return res.status(400).json({ error: "Both user IDs are required" })
    }

    if (userId1 === userId2) {
      return res.status(400).json({ error: "Cannot create conversation with yourself" })
    }

    // Check if conversation already exists
    let conversation = await conversationModel
      .findOne({
        type: "direct",
        participants: { $all: [userId1, userId2] },
      })
      .populate("participants", "name avatar")
      .populate("lastMessage.senderId", "name")

    if (!conversation) {
      // Create new conversation
      conversation = new conversationModel({
        participants: [userId1, userId2],
        type: "direct",
      })

      await conversation.save()
      await conversation.populate("participants", "name avatar")
    }

    res.status(200).json(conversation)
  } catch (error) {
    console.error("Error getting/creating conversation:", error)
    res.status(500).json({ error: "Failed to get/create conversation" })
  }
}

// Get or create group conversation - ENHANCED
export const getOrCreateGroupConversation = async (req, res) => {
  try {
    const { groupId } = req.body

    if (!groupId) {
      return res.status(400).json({ error: "Group ID is required" })
    }

    // Check if conversation already exists
    let conversation = await conversationModel
      .findOne({
        type: "group",
        groupId: groupId,
      })
      .populate({
        path: "groupId",
        select: "name members inviteCode createdBy",
        populate: {
          path: "members createdBy",
          select: "name avatar",
        },
      })
      .populate("lastMessage.senderId", "name")

    if (!conversation) {
      // Verify the group exists
      const group = await circleModel.findById(groupId)
      if (!group) {
        return res.status(404).json({ error: "Group not found" })
      }

      // Create new conversation
      conversation = new conversationModel({
        groupId: groupId,
        type: "group",
      })

      await conversation.save()
      await conversation.populate({
        path: "groupId",
        select: "name members inviteCode createdBy",
        populate: {
          path: "members createdBy",
          select: "name avatar",
        },
      })
    }

    res.status(200).json(conversation)
  } catch (error) {
    console.error("Error getting/creating group conversation:", error)
    res.status(500).json({ error: "Failed to get/create group conversation" })
  }
}

// Get user's conversations - ENHANCED
export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params
    const { type } = req.query // 'direct' or 'group' or 'all'

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" })
    }

    let query = {}

    if (type === "direct") {
      query = {
        type: "direct",
        participants: userId,
      }
    } else if (type === "group") {
      // First get user's groups
      const userGroups = await circleModel.find({ members: userId }).select("_id")
      const groupIds = userGroups.map((group) => group._id)

      query = {
        type: "group",
        groupId: { $in: groupIds },
      }
    } else {
      // Get all conversations
      const userGroups = await circleModel.find({ members: userId }).select("_id")
      const groupIds = userGroups.map((group) => group._id)

      query = {
        $or: [
          { type: "direct", participants: userId },
          { type: "group", groupId: { $in: groupIds } },
        ],
      }
    }

    const conversations = await conversationModel
      .find(query)
      .populate("participants", "name avatar")
      .populate({
        path: "groupId",
        select: "name members inviteCode createdBy",
        populate: {
          path: "createdBy",
          select: "name avatar",
        },
      })
      .populate("lastMessage.senderId", "name")
      .sort({ updatedAt: -1 })

    // Add unread count for each conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await messageModel.countDocuments({
          conversationId: conversation._id,
          senderId: { $ne: userId },
          $or: [{ status: { $ne: "read" } }, { readBy: { $not: { $elemMatch: { userId: userId } } } }],
        })

        return {
          ...conversation.toObject(),
          unreadCount,
        }
      }),
    )

    res.status(200).json(conversationsWithUnread)
  } catch (error) {
    console.error("Error fetching user conversations:", error)
    res.status(500).json({ error: "Failed to fetch conversations" })
  }
}

// Delete conversation
export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params
    const { userId } = req.body

    if (!conversationId || !userId) {
      return res.status(400).json({ error: "Conversation ID and User ID are required" })
    }

    const conversation = await conversationModel.findById(conversationId)

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" })
    }

    // Check if user is part of the conversation
    if (conversation.type === "direct" && !conversation.participants.includes(userId)) {
      return res.status(403).json({ error: "Not authorized to delete this conversation" })
    }

    // Delete all messages in the conversation
    await messageModel.deleteMany({ conversationId })

    // Delete the conversation
    await conversationModel.findByIdAndDelete(conversationId)

    res.status(200).json({ message: "Conversation deleted successfully" })
  } catch (error) {
    console.error("Error deleting conversation:", error)
    res.status(500).json({ error: "Failed to delete conversation" })
  }
}
