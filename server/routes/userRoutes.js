import express from 'express'
import { getUser, updateUser, deleteUser, getUsersByCircle } from '../controllers/userController.js'; 

const userRouter = express.Router();

// http://localhost:5005/api/users/:id
userRouter.get('/:id',getUser)

// http://localhost:5005/api/users/:id
userRouter.put('/:id',updateUser)

// http://localhost:5005/api/users/:id
userRouter.delete('/:id',deleteUser)

// http://localhost:5005/api/users/circle/:circleId
userRouter.get('/circle/:circleId',getUsersByCircle)

export default userRouter
