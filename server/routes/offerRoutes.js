import express from 'express'
import {
  createOffer,
  getOffersByItem,
  getOffersByUser,
  updateOfferStatus,
  deleteOffer
} from '../controllers/offerController.js'

const offerRouter = express.Router()

// http://localhost:5005/api/offers
offerRouter.post('/', createOffer)

// http://localhost:5005/api/offers/item/:itemId
offerRouter.get('/item/:itemId', getOffersByItem)

// http://localhost:5005/api/offers/user/:userId
offerRouter.get('/user/:userId', getOffersByUser)

// http://localhost:5005/api/offers/:id
offerRouter.put('/:id', updateOfferStatus)

// http://localhost:5005/api/offers/:id
offerRouter.delete('/:id', deleteOffer)

export default offerRouter
