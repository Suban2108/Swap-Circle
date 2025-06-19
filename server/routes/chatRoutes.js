import express from 'express'
import {
  startChat,
  getChatMessages,
  sendMessage,
  getUserChats
} from '../controllers/chatControllers.js'

const chatRouter = express.Router()

// http://localhost:5005/api/chat/start
chatRouter.post('/start', startChat)

// http://localhost:5005/api/chat/:threadId
chatRouter.get('/:threadId', getChatMessages)

// http://localhost:5005/api/chat/:threadId/message
chatRouter.post('/:threadId/message', sendMessage)

// http://localhost:5005/api/chat/user/:userId
chatRouter.get('/user/:userId', getUserChats)

export default chatRouter
