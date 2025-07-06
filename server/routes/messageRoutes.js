import express from "express"
import {
  sendMessage,
  getConversationMessages,
  markMessagesAsRead,
  deleteMessage,
  uploadMessageFile
} from "../controllers/messageController.js"
import upload from '../middleware/uploadChatImages.js'

const messageRouter = express.Router()

// POST /api/messages/send
messageRouter.post("/send", sendMessage)

// GET /api/messages/conversation/:conversationId
messageRouter.get("/conversation/:conversationId", getConversationMessages)

// POST /api/messages/mark-read
messageRouter.post("/mark-read", markMessagesAsRead)

// DELETE /api/messages/:messageId
messageRouter.delete("/:messageId", deleteMessage)

// /api/messages/upload
messageRouter.post("/upload", upload.single("file"), uploadMessageFile)

export default messageRouter
