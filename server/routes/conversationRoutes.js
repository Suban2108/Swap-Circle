import express from "express"
import {
  getOrCreateDirectConversation,
  getOrCreateGroupConversation,
  getUserConversations,
  deleteConversation,
} from "../controllers/conversationController.js"

const conversationRouter = express.Router()

// POST /api/conversations/direct
conversationRouter.post("/direct", getOrCreateDirectConversation)

// POST /api/conversations/group
conversationRouter.post("/group", getOrCreateGroupConversation)

// GET /api/conversations/user/:userId
conversationRouter.get("/user/:userId", getUserConversations)

// DELETE /api/conversations/:conversationId
conversationRouter.delete("/:conversationId", deleteConversation)

export default conversationRouter
