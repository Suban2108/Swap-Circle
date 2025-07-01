import express from "express"
import {
  sendMessage,
  getOneToOneMessages,
  getGroupMessages,
  getUserChatContacts,
  markMessagesAsRead,
} from "../controllers/chatController.js"

const chatRouter = express.Router()

// POST /api/chat/send
chatRouter.post("/send", sendMessage)

// GET /api/chat/one-to-one?senderId=...&receiverId=...
chatRouter.get("/one-to-one", getOneToOneMessages)

// GET /api/chat/group/:groupId
chatRouter.get("/group/:groupId", getGroupMessages)

// GET /api/chat/contacts/:userId
chatRouter.get("/contacts/:userId", getUserChatContacts)

// POST /api/chat/mark-read
chatRouter.post("/mark-read", markMessagesAsRead)

export default chatRouter
