import express from 'express'
import { getUser, updateUser, deleteUser, getUsersByCircle, uploadProfileImage, getUserByEmail } from '../controllers/userController.js'; 
import authRouter from './authRoutes.js';
import upload from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get('/email/:email', getUserByEmail);

// http://localhost:5005/api/users/:id
userRouter.get('/:id',getUser)

// http://localhost:5005/api/users/:id
userRouter.put('/:id',updateUser)

// http://localhost:5005/api/users/:id
userRouter.delete('/:id',deleteUser)

// http://localhost:5005/api/users/circle/:circleId
userRouter.get('/circle/:circleId',getUsersByCircle)



userRouter.post("/:id/upload", upload.single("image"), uploadProfileImage);



export default userRouter
