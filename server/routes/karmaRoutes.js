import express from 'express'
import {
  getUserKarma,
  addKarma,
  deductKarma,
  getLeaderboard
} from '../controllers/karmaControllers.js'

const karmaRouter = express.Router()

// http://localhost:5005/api/karma/:userId
karmaRouter.get('/:userId', getUserKarma)

// http://localhost:5005/api/karma/add
karmaRouter.post('/add', addKarma)

// http://localhost:5005/api/karma/deduct
karmaRouter.post('/deduct', deductKarma)

// http://localhost:5005/api/karma/leaderboard
karmaRouter.get('/leaderboard', getLeaderboard)

export default karmaRouter
