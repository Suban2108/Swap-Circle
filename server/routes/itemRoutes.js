import express from 'express'
import { getItem,createItem,updateItem,deleteItem } from '../controllers/itemControllers.js'


const itemRouter = express.Router()


// http://localhost:5005/api/items/get-item
itemRouter.get('/get-item',getItem)

// http://localhost:5005/api/items/create-item
itemRouter.post('/create-item', createItem)

// http://localhost:5005/api/items/:id
itemRouter.put('/:id', updateItem)

// http://localhost:5005/api/items/:id
itemRouter.delete('/:id', deleteItem)

export default itemRouter;