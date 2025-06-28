import express from 'express'
import {
  sendMessage,
  getOneToOneMessages,
  getGroupMessages,
  getUserChatContacts
} from '../controllers/chatController.js'

const chatRouter = express.Router()

// POST http://localhost:5005/api/chat/send
chatRouter.post('/send', sendMessage)     //receiver for 1 to 1 & group as receviver for group

// GET /api/chat/one-to-one?senderId=...&receiverId=...
chatRouter.get('/one-to-one', getOneToOneMessages)

// GET /api/chat/group/:groupId
chatRouter.get('/group/:groupId', getGroupMessages)

// GET /api/chat/contacts/:userId
chatRouter.get('/contacts/:userId', getUserChatContacts) //This fetches a list of users that this user has chatted with in one-to-one mode.

export default chatRouter
