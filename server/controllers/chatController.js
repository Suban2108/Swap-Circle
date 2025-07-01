import chatModel from "../models/chatModel.js"
import userModel from "../models/userModel.js"

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, groupId, itemId, content } = req.body

    if (!senderId || !content) {
      return res.status(400).json({ error: "SenderId and content are required" })
    }

    if (!receiverId && !groupId) {
      return res.status(400).json({ error: "Either receiverId or groupId is required" })
    }

    const newMessage = new chatModel({
      senderId,
      receiverId,
      groupId,
      itemId,
      content,
      timestamp: new Date(),
      read: false,
    })

    const savedMessage = await newMessage.save()

    // Populate sender information
    await savedMessage.populate("senderId", "name avatar")

    res.status(201).json(savedMessage)
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: "Failed to send message" })
  }
}

// Get one-to-one messages
export const getOneToOneMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "SenderId and receiverId are required" })
    }

    const messages = await chatModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .populate("senderId", "name avatar")
      .populate("receiverId", "name avatar")
      .sort({ timestamp: 1 })

    res.status(200).json(messages)
  } catch (error) {
    console.error("Error fetching one-to-one messages:", error)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
}

// Get group messages
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params

    if (!groupId) {
      return res.status(400).json({ error: "GroupId is required" })
    }

    const messages = await chatModel.find({ groupId }).populate("senderId", "name avatar").sort({ timestamp: 1 })

    res.status(200).json(messages)
  } catch (error) {
    console.error("Error fetching group messages:", error)
    res.status(500).json({ error: "Failed to fetch group messages" })
  }
}

// Get user chat contacts
export const getUserChatContacts = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" })
    }

    // Get all unique users this user has chatted with
    const sentMessages = await chatModel.find({ senderId: userId }).distinct("receiverId").populate("receiverId")

    const receivedMessages = await chatModel.find({ receiverId: userId }).distinct("senderId").populate("senderId")

    // Combine and deduplicate contacts
    const contactIds = [...new Set([...sentMessages.filter((id) => id), ...receivedMessages.filter((id) => id)])]

    // Get contact details with last message info
    const contacts = await Promise.all(
      contactIds.map(async (contactId) => {
        const user = await userModel.findById(contactId).select("name avatar")

        // Get last message between users
        const lastMessage = await chatModel
          .findOne({
            $or: [
              { senderId: userId, receiverId: contactId },
              { senderId: contactId, receiverId: userId },
            ],
          })
          .sort({ timestamp: -1 })
          .select("content timestamp")

        // Count unread messages
        const unreadCount = await chatModel.countDocuments({
          senderId: contactId,
          receiverId: userId,
          read: false,
        })

        return {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          lastMessage: lastMessage?.content || "",
          timestamp: lastMessage?.timestamp || null,
          unread: unreadCount,
          online: false, // You can implement online status logic here
        }
      }),
    )

    res.status(200).json(contacts)
  } catch (error) {
    console.error("Error fetching user chat contacts:", error)
    res.status(500).json({ error: "Failed to fetch chat contacts" })
  }
}

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "SenderId and receiverId are required" })
    }

    await chatModel.updateMany({ senderId: receiverId, receiverId: senderId, read: false }, { read: true })

    res.status(200).json({ message: "Messages marked as read" })
  } catch (error) {
    console.error("Error marking messages as read:", error)
    res.status(500).json({ error: "Failed to mark messages as read" })
  }
}
