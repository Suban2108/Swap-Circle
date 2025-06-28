import express from 'express'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  getItemsByUser
} from '../controllers/itemControllers.js'

const itemRouter = express.Router()

// http://localhost:5005/api/items/search
itemRouter.get('/search', searchItems)

// http://localhost:5005/api/items/user/:userId
itemRouter.get('/user/:userId', getItemsByUser)


// http://localhost:5005/api/items
itemRouter.get('/', getAllItems)

// http://localhost:5005/api/items/:id
itemRouter.get('/:id', getItemById)

// http://localhost:5005/api/items/create-items
itemRouter.post('/create-items', createItem)

// http://localhost:5005/api/items/:id
itemRouter.put('/:id', updateItem)

// http://localhost:5005/api/items/:id
itemRouter.delete('/:id', deleteItem)

export default itemRouter
