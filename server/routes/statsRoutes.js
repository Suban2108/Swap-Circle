import express from 'express'
import {
  getOverviewStats,
  getUserStats,
  getCircleStats
} from '../controllers/statsControllers.js'

const statsRouter = express.Router()

// http://localhost:5005/api/stats/overview
statsRouter.get('/overview', getOverviewStats)

// http://localhost:5005/api/stats/user/:userId
statsRouter.get('/user/:userId', getUserStats)

// http://localhost:5005/api/stats/circle/:circleId
statsRouter.get('/circle/:circleId', getCircleStats)

export default statsRouter
