import express from 'express'
import {
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest
} from '../controllers/requestControllers.js'

const requestRouter = express.Router()

// http://localhost:5005/api/requests
requestRouter.get('/', getAllRequests)

// http://localhost:5005/api/requests
requestRouter.post('/', createRequest)

// http://localhost:5005/api/requests/:id
requestRouter.put('/:id', updateRequest)

// http://localhost:5005/api/requests/:id
requestRouter.delete('/:id', deleteRequest)

export default requestRouter
