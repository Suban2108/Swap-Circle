import express from 'express'
import {
  getAllEvents,
  createEvent,
  getEventById,
  joinEvent,
  rewardParticipants
} from '../controllers/eventController.js'

const eventRouter = express.Router()

// http://localhost:5005/api/events
eventRouter.get('/', getAllEvents)

// http://localhost:5005/api/events/create
eventRouter.post('/create', createEvent)

// http://localhost:5005/api/events/:id
eventRouter.get('/:id', getEventById)

// http://localhost:5005/api/events/:id/join
eventRouter.post('/:id/join', joinEvent)

// http://localhost:5005/api/events/:id/reward
eventRouter.post('/:id/reward', rewardParticipants)

export default eventRouter
