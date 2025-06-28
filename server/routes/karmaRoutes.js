import express from 'express'
import {
  getUserKarma,
  addKarma,
  deductKarma,
  getLeaderboard
} from '../controllers/karmaController.js'

const karmaRouter = express.Router()

// http://localhost:5005/api/karma/leaderboard
karmaRouter.get('/leaderboard', getLeaderboard)

// http://localhost:5005/api/karma/:userId
karmaRouter.get('/:userId', getUserKarma)

// http://localhost:5005/api/karma/add
karmaRouter.post('/add', addKarma)

// http://localhost:5005/api/karma/deduct
karmaRouter.post('/deduct', deductKarma)


export default karmaRouter
