import express from 'express'
import { getUser, updateUser, deleteUser, getUsersByCircle, uploadProfileImage, getUserByEmail, sendContactMail } from '../controllers/userController.js'; 
import authRouter from './authRoutes.js';
import upload from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get('/email/:email', getUserByEmail);


// http://localhost:5005/api/users/:id
userRouter.get('/get-user',getUser)

// http://localhost:5005/api/users/:id
userRouter.put('/update-user',updateUser)

// http://localhost:5005/api/users/:id
userRouter.delete('/delete-user',deleteUser)

// http://localhost:5005/api/users/circle/:circleId
userRouter.get('/circle/:circleId',getUsersByCircle)

userRouter.post('/send-contact-query', sendContactMail)

userRouter.post("/upload", upload.single("image"), uploadProfileImage);



export default userRouter
