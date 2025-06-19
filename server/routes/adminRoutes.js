import express from 'express'
import {
  getAllUsers,
  getAllItems,
  getReports,
  banUser,
  removeItem
} from '../controllers/adminControllers.js'

const adminRouter = express.Router()

// http://localhost:5005/api/admin/users
adminRouter.get('/users', getAllUsers)

// http://localhost:5005/api/admin/items
adminRouter.get('/items', getAllItems)

// http://localhost:5005/api/admin/reports
adminRouter.get('/reports', getReports)

// http://localhost:5005/api/admin/ban-user/:id
adminRouter.put('/ban-user/:id', banUser)

// http://localhost:5005/api/admin/item/:id
adminRouter.delete('/item/:id', removeItem)

export default adminRouter
