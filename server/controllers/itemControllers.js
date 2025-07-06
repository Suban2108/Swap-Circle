import Item from "../models/itemModel.js"
import { deleteUploadedFiles } from "../middleware/uploadItemMiddleware.js"
import fs from "fs"
import path from "path"

// GET /api/items - Get all items
const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = "newest" } = req.query

    let sortOption = { createdAt: -1 } // Default: newest first

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "popular":
        sortOption = { views: -1, createdAt: -1 }
        break
      case "alphabetical":
        sortOption = { title: 1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    const items = await Item.findAvailable().sort(sortOption).skip(skip).limit(Number.parseInt(limit))

    const total = await Item.countDocuments({
      status: { $ne: "removed" },
      isActive: true,
    })

    res.status(200).json({
      items,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / Number.parseInt(limit)),
        total,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message })
  }
}

// GET /api/items/:id - Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("ownerId", "name email profilePic")
      .populate("swapRequests.requesterId", "name profilePic")
      .populate("swapRequests.offeredItemId", "title images")

    if (!item || item.status === "removed" || !item.isActive) {
      return res.status(404).json({ message: "Item not found" })
    }

    // Increment view count (don't await to avoid slowing response)
    item.incrementViews().catch((err) => console.error("Failed to increment views:", err))

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error: error.message })
  }
}

// POST /api/items/create-items - Create a new item with image upload
const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      deliveryNotes,
      condition = "good",
      estimatedValue,
      tags,
      location,
    } = req.body

    // Validate required fields
    if (!title || !description || !category || !type) {
      // Clean up uploaded files if validation fails
      if (req.files && req.files.length > 0) {
        const filePaths = req.files.map((file) => file.path)
        deleteUploadedFiles(filePaths)
      }
      return res.status(400).json({
        message: "Missing required fields: title, description, category, and type are required",
      })
    }

    // Process uploaded images with detailed metadata
    const imageData = []
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const relativePath = `/uploads/items/${file.filename}`
        imageData.push({
          url: relativePath,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          uploadedAt: new Date(),
        })
      })
    }

    // Parse tags if provided
    let parsedTags = []
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags
      } catch (e) {
        parsedTags = typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : []
      }
    }

    // Parse location if provided
    let parsedLocation = null
    if (location) {
      try {
        parsedLocation = typeof location === "string" ? JSON.parse(location) : location
      } catch (e) {
        console.warn("Invalid location data provided")
      }
    }

    const newItem = new Item({
      ownerId: req.user._id,
      title: title.trim(),
      description: description.trim(),
      images: imageData,
      category,
      type,
      deliveryNotes: deliveryNotes?.trim() || "",
      condition,
      estimatedValue: estimatedValue ? Number.parseFloat(estimatedValue) : undefined,
      tags: parsedTags,
      location: parsedLocation,
      status: "available",
      isActive: true,
    })

    const savedItem = await newItem.save()
    await savedItem.populate("ownerId", "name email profilePic")

    res.status(201).json({
      message: "Item created successfully",
      item: savedItem,
    })
  } catch (error) {
    // Clean up uploaded files if database save fails
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map((file) => file.path)
      deleteUploadedFiles(filePaths)
    }

    res.status(500).json({ message: "Failed to create item", error: error.message })
  }
}

// PUT /api/items/:id - Update an item
const updateItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      deliveryNotes,
      status,
      condition,
      estimatedValue,
      tags,
      location,
      removeImages, // Array of image filenames to remove
    } = req.body

    const updateData = {}

    // Update fields if provided
    if (title) updateData.title = title.trim()
    if (description) updateData.description = description.trim()
    if (category) updateData.category = category
    if (type) updateData.type = type
    if (deliveryNotes !== undefined) updateData.deliveryNotes = deliveryNotes.trim()
    if (status) updateData.status = status
    if (condition) updateData.condition = condition
    if (estimatedValue !== undefined) updateData.estimatedValue = Number.parseFloat(estimatedValue)

    // Handle tags
    if (tags) {
      try {
        updateData.tags = typeof tags === "string" ? JSON.parse(tags) : tags
      } catch (e) {
        updateData.tags = typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : []
      }
    }

    // Handle location
    if (location) {
      try {
        updateData.location = typeof location === "string" ? JSON.parse(location) : location
      } catch (e) {
        console.warn("Invalid location data provided")
      }
    }

    // Handle image removal
    let currentImages = [...req.item.images]
    if (removeImages && Array.isArray(removeImages)) {
      removeImages.forEach((filename) => {
        const index = currentImages.findIndex((img) => img.filename === filename)
        if (index > -1) {
          const removedImage = currentImages.splice(index, 1)[0]
          // Delete physical file
          const filePath = path.join(process.cwd(), "uploads/items", removedImage.filename)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }
      })
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const relativePath = `/uploads/items/${file.filename}`
        currentImages.push({
          url: relativePath,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          uploadedAt: new Date(),
        })
      })
    }

    // Limit to 5 images maximum
    if (currentImages.length > 5) {
      const excessImages = currentImages.slice(5)
      excessImages.forEach((img) => {
        const filePath = path.join(process.cwd(), "uploads/items", img.filename)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })
      currentImages = currentImages.slice(0, 5)
    }

    updateData.images = currentImages

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate(
      "ownerId",
      "name email profilePic",
    )

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem,
    })
  } catch (error) {
    // Clean up uploaded files if update fails
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map((file) => file.path)
      deleteUploadedFiles(filePaths)
    }

    res.status(500).json({ message: "Failed to update item", error: error.message })
  }
}

// DELETE /api/items/:id - Delete an item (soft delete)
const deleteItem = async (req, res) => {
  try {
    const item = req.item // From checkItemOwnership middleware

    // Soft delete using the model method
    await item.softDelete()

    // Optionally, delete associated image files
    if (item.images && item.images.length > 0) {
      item.images.forEach((img) => {
        const filePath = path.join(process.cwd(), "uploads/items", img.filename)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })
    }

    res.status(200).json({ message: "Item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message })
  }
}

// GET /api/items/search – Search/filter items
const searchItems = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = "newest", ...searchQuery } = req.query

    let sortOption = { createdAt: -1 }

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "popular":
        sortOption = { views: -1, createdAt: -1 }
        break
      case "alphabetical":
        sortOption = { title: 1 }
        break
      case "price-low":
        sortOption = { estimatedValue: 1, createdAt: -1 }
        break
      case "price-high":
        sortOption = { estimatedValue: -1, createdAt: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    const items = await Item.searchItems(searchQuery).sort(sortOption).skip(skip).limit(Number.parseInt(limit))

    // Get total count for pagination
    const totalQuery = await Item.searchItems(searchQuery)
    const total = await totalQuery.countDocuments()

    res.status(200).json({
      items,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / Number.parseInt(limit)),
        total,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message })
  }
}

// GET /api/items/user/:userId – Get items listed by a user
const getItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { includeRemoved = false, page = 1, limit = 20 } = req.query

    const filter = { ownerId: userId }
    if (!includeRemoved) {
      filter.status = { $ne: "removed" }
      filter.isActive = true
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    const items = await Item.find(filter)
      .populate("ownerId", "name email profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Item.countDocuments(filter)

    res.status(200).json({
      items,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / Number.parseInt(limit)),
        total,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user items", error: error.message })
  }
}

// GET /api/items/:id/likes - Get likes for an item
const getItemLikes = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("likes.userId", "name profilePic")

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.status(200).json({
      likes: item.likes,
      count: item.likes.length,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to get item likes", error: error.message })
  }
}

// GET /api/items/:id/swap-requests - Get swap requests for an item
const getItemSwapRequests = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("swapRequests.requesterId", "name profilePic")
      .populate("swapRequests.offeredItemId", "title images")

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    // Check if user is authorized to view swap requests (must be item owner)
    if (item.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to view these swap requests" })
    }

    res.status(200).json({
      swapRequests: item.swapRequests,
      count: item.swapRequests.length,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to get swap requests", error: error.message })
  }
}

// PUT /api/items/:id/swap-requests/:requestId - Update swap request status
const updateSwapRequestStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!["accepted", "rejected", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'accepted', 'rejected', or 'cancelled'" })
    }

    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    // Find the swap request
    const swapRequest = item.swapRequests.id(req.params.requestId)

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" })
    }

    // Check authorization
    if (
      item.ownerId.toString() !== req.user._id.toString() &&
      swapRequest.requesterId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "You are not authorized to update this swap request" })
    }

    // Only the requester can cancel, only the owner can accept/reject
    if (status === "cancelled" && swapRequest.requesterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the requester can cancel a swap request" })
    }

    if (["accepted", "rejected"].includes(status) && item.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the item owner can accept or reject a swap request" })
    }

    // Update the status
    swapRequest.status = status

    // If accepted, update both items' status
    if (status === "accepted") {
      item.status = "exchanged"

      // Update the offered item status
      const offeredItem = await Item.findById(swapRequest.offeredItemId)
      if (offeredItem) {
        offeredItem.status = "exchanged"
        await offeredItem.save()
      }
    }

    await item.save()

    res.status(200).json({
      message: `Swap request ${status}`,
      swapRequest,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to update swap request", error: error.message })
  }
}

// GET /api/items/stats - Get marketplace statistics
const getMarketplaceStats = async (req, res) => {
  try {
    const stats = {
      totalItems: await Item.countDocuments({ status: { $ne: "removed" }, isActive: true }),
      availableItems: await Item.countDocuments({ status: "available", isActive: true }),
      exchangedItems: await Item.countDocuments({ status: "exchanged", isActive: true }),
      pendingItems: await Item.countDocuments({ status: "pending", isActive: true }),
      categoryCounts: [],
      recentActivity: [],
    }

    // Get category distribution
    const categoryAggregation = await Item.aggregate([
      { $match: { status: { $ne: "removed" }, isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    stats.categoryCounts = categoryAggregation.map((item) => ({
      category: item._id,
      count: item.count,
    }))

    // Get recent activity (likes, new items, exchanges)
    const recentItems = await Item.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("ownerId", "name")
      .select("title createdAt ownerId")

    stats.recentActivity = recentItems.map((item) => ({
      type: "new_item",
      item: {
        _id: item._id,
        title: item.title,
      },
      user: item.ownerId ? { name: item.ownerId.name, _id: item.ownerId._id } : null,
      timestamp: item.createdAt,
    }))

    res.status(200).json(stats)
  } catch (error) {
    res.status(500).json({ message: "Failed to get marketplace statistics", error: error.message })
  }
}

// POST /api/items/:id/like - Like/unlike an item
const toggleLike = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    const existingLike = item.likes.find((like) => like.userId.toString() === req.user._id.toString())

    if (existingLike) {
      // Remove like
      await item.removeLike(req.user._id)
      res.status(200).json({
        message: "Item unliked",
        liked: false,
        likeCount: item.likes.length,
      })
    } else {
      // Add like
      await item.addLike(req.user._id)
      res.status(200).json({
        message: "Item liked",
        liked: true,
        likeCount: item.likes.length,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error: error.message })
  }
}

// POST /api/items/:id/swap-request - Create a swap request
const createSwapRequest = async (req, res) => {
  try {
    const { offeredItemId, message } = req.body

    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (item.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot request to swap your own item" })
    }

    const swapRequestData = {
      requesterId: req.user._id,
      offeredItemId,
      message: message?.trim() || "",
      status: "pending",
    }

    await item.addSwapRequest(swapRequestData)

    res.status(201).json({ message: "Swap request sent successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to create swap request", error: error.message })
  }
}

export {
  deleteItem,
  updateItem,
  getAllItems,
  getItemById,
  createItem,
  searchItems,
  getItemsByUser,
  toggleLike,
  createSwapRequest,
  getItemLikes,
  getItemSwapRequests,
  updateSwapRequestStatus,
  getMarketplaceStats,
}
