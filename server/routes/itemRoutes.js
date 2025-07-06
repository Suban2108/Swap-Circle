import express from "express"
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  getItemsByUser,
  toggleLike,
  createSwapRequest,
  getItemLikes,
  getItemSwapRequests,
  updateSwapRequestStatus,
  getMarketplaceStats,
} from "../controllers/itemControllers.js"

import { uploadItemImages, handleUploadError } from "../middleware/uploadItemMiddleware.js"
import { protect, checkItemOwnership } from "../middleware/authMiddleware.js" // ✅ protect = cookie-based auth

const itemRouter = express.Router()

// 🌐 Public Routes – STATIC First
itemRouter.get("/search", searchItems)
itemRouter.get("/user/:userId", getItemsByUser)
itemRouter.get("/stats", getMarketplaceStats)
itemRouter.get("/", getAllItems) // Keep "/" before dynamic ":id" to avoid conflicts

// 🔐 Protected Routes – STATIC First
itemRouter.post("/create-items", protect, uploadItemImages, handleUploadError, createItem)
itemRouter.get("/:id/likes", protect, getItemLikes)
itemRouter.post("/:id/like", protect, toggleLike)
itemRouter.post("/:id/swap-request", protect, createSwapRequest)
itemRouter.get("/:id/swap-requests", protect, getItemSwapRequests)
itemRouter.put("/:id/swap-requests/:requestId", protect, updateSwapRequestStatus)

// 🔐 Protected Routes – DYNAMIC Routes After Static
itemRouter.get("/:id", getItemById)
itemRouter.put("/:id", protect, checkItemOwnership, uploadItemImages, handleUploadError, updateItem)
itemRouter.delete("/:id", protect, checkItemOwnership, deleteItem)

export default itemRouter
