import circleModel from "../models/circleModel.js"
import chatModel from "../models/chatModel.js"
import userModel from "../models/userModel.js" // Add this import

// Create circle
export const createCircle = async (req, res) => {
  try {
    const { name, inviteCode, createdBy } = req.body

    if (!name || !inviteCode || !createdBy) {
      return res.status(400).json({ error: "Name, inviteCode, and createdBy are required" })
    }

    // Check if invite code already exists
    const existingCircle = await circleModel.findOne({ inviteCode })
    if (existingCircle) {
      return res.status(400).json({ error: "Invite code already exists" })
    }

    const newCircle = new circleModel({
      name,
      inviteCode,
      createdBy,
      members: [createdBy], // Creator is automatically a member
    })

    const savedCircle = await newCircle.save()
    await savedCircle.populate("createdBy", "name avatar")
    await savedCircle.populate("members", "name avatar")

    res.status(201).json(savedCircle)
  } catch (error) {
    console.error("Error creating circle:", error)
    res.status(500).json({ error: "Failed to create circle" })
  }
}

// Get circle details
export const getCircleDetails = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: "Circle ID is required" })
    }

    const circle = await circleModel
      .findById(id)
      .populate("createdBy", "name avatar")
      .populate("members", "name avatar")

    if (!circle) {
      return res.status(404).json({ error: "Circle not found" })
    }

    res.status(200).json(circle)
  } catch (error) {
    console.error("Error fetching circle details:", error)
    res.status(500).json({ error: "Failed to fetch circle details" })
  }
}

// Join circle
export const joinCircle = async (req, res) => {
  try {
    const { userId, inviteCode } = req.body

    if (!userId || !inviteCode) {
      return res.status(400).json({ error: "UserId and inviteCode are required" })
    }

    const circle = await circleModel.findOne({ inviteCode })
    if (!circle) {
      return res.status(404).json({ error: "Invalid invite code" })
    }

    // Check if user is already a member
    if (circle.members.includes(userId)) {
      return res.status(400).json({ error: "User is already a member of this circle" })
    }

    // Add user to circle
    circle.members.push(userId)
    await circle.save()

    await circle.populate("members", "name avatar")

    res.status(200).json({
      message: "Successfully joined circle",
      circle,
    })
  } catch (error) {
    console.error("Error joining circle:", error)
    res.status(500).json({ error: "Failed to join circle" })
  }
}

// Get circle members
export const getCircleMembers = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: "Circle ID is required" })
    }

    // First check if circle exists
    const circle = await circleModel.findById(id)
    if (!circle) {
      return res.status(404).json({ error: "Circle not found" })
    }

    // Get detailed member information
    const members = await userModel
      .find({
        _id: { $in: circle.members },
      })
      .select("name avatar")

    res.status(200).json(members)
  } catch (error) {
    console.error("Error fetching circle members:", error)
    res.status(500).json({ error: "Failed to fetch circle members" })
  }
}

// Get groups by user
export const getGroupsByUser = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" })
    }

    const circles = await circleModel.find({ members: userId }).populate("createdBy", "name avatar").sort({ _id: -1 })

    // Get last message for each group
    const circlesWithLastMessage = await Promise.all(
      circles.map(async (circle) => {
        const lastMessage = await chatModel
          .findOne({ groupId: circle._id })
          .sort({ timestamp: -1 })
          .populate("senderId", "name")
          .select("content timestamp senderId")

        return {
          _id: circle._id,
          name: circle.name,
          inviteCode: circle.inviteCode,
          createdBy: circle.createdBy,
          members: circle.members,
          lastMessage: lastMessage?.content || "",
          timestamp: lastMessage?.timestamp || circle.createdAt,
          lastMessageSender: lastMessage?.senderId?.name || "",
        }
      }),
    )

    res.status(200).json(circlesWithLastMessage)
  } catch (error) {
    console.error("Error fetching user groups:", error)
    res.status(500).json({ error: "Failed to fetch user groups" })
  }
}

// Leave circle
export const leaveCircle = async (req, res) => {
  try {
    const { circleId, userId } = req.body

    if (!circleId || !userId) {
      return res.status(400).json({ error: "CircleId and userId are required" })
    }

    const circle = await circleModel.findById(circleId)
    if (!circle) {
      return res.status(404).json({ error: "Circle not found" })
    }

    // Remove user from members
    circle.members = circle.members.filter((member) => member.toString() !== userId)
    await circle.save()

    res.status(200).json({ message: "Successfully left circle" })
  } catch (error) {
    console.error("Error leaving circle:", error)
    res.status(500).json({ error: "Failed to leave circle" })
  }
}
