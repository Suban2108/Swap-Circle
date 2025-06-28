import express from 'express'
import {
  createCircle,
  getCircleDetails,
  joinCircle,
  getCircleMembers
} from '../controllers/circleController.js'

const circleRouter = express.Router()

// http://localhost:5005/api/circles/create
circleRouter.post('/create', createCircle)

// http://localhost:5005/api/circles/:id
circleRouter.get('/:id', getCircleDetails)

// http://localhost:5005/api/circles/join
circleRouter.post('/join', joinCircle)

// http://localhost:5005/api/circles/:id/members
circleRouter.get('/:id/members', getCircleMembers)

export default circleRouter
