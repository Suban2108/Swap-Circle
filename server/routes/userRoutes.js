import express from 'express'

const userRouter = express.Router();

// http://localhost:5005/api/users/:id
userRouter.get('/:id',getUser)

// http://localhost:5005/api/users/:id
userRouter.put('/:id',updateUser)

// http://localhost:5005/api/users/:id
userRouter.delete('/:id',deleteUser)

// http://localhost:5005/api/users/circle/:circleId
userRouter.get('/circle/:circleId',userInCircle)

export default userRouter
