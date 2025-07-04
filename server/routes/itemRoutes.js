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
import { authenticateToken, checkItemOwnership } from "../middleware/authMiddleware.js"

const itemRouter = express.Router()

// Public routes (no authentication required)
itemRouter.get("/search", searchItems)
itemRouter.get("/user/:userId", getItemsByUser)
itemRouter.get("/", getAllItems)
itemRouter.get("/:id", getItemById)
itemRouter.get("/stats", getMarketplaceStats)

// Protected routes (authentication required)
itemRouter.post("/create-items", authenticateToken, uploadItemImages, handleUploadError, createItem)
itemRouter.post("/:id/like", authenticateToken, toggleLike)
itemRouter.get("/:id/likes", authenticateToken, getItemLikes)
itemRouter.post("/:id/swap-request", authenticateToken, createSwapRequest)
itemRouter.get("/:id/swap-requests", authenticateToken, getItemSwapRequests)
itemRouter.put("/:id/swap-requests/:requestId", authenticateToken, updateSwapRequestStatus)
itemRouter.put("/:id", authenticateToken, checkItemOwnership, uploadItemImages, handleUploadError, updateItem)
itemRouter.delete("/:id", authenticateToken, checkItemOwnership, deleteItem)

export default itemRouter
