import express from "express"
import {
  sendMessage,
  getConversationMessages,
  markMessagesAsRead,
  deleteMessage,
} from "../controllers/messageController.js"

const messageRouter = express.Router()

// POST /api/messages/send
messageRouter.post("/send", sendMessage)

// GET /api/messages/conversation/:conversationId
messageRouter.get("/conversation/:conversationId", getConversationMessages)

// POST /api/messages/mark-read
messageRouter.post("/mark-read", markMessagesAsRead)

// DELETE /api/messages/:messageId
messageRouter.delete("/:messageId", deleteMessage)

export default messageRouter
