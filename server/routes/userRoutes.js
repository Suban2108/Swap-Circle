import express from 'express'
import { getUser, updateUser, deleteUser, getUsersByCircle, uploadProfileImage, getUserByEmail, sendContactMail } from '../controllers/userController.js'; 
import upload from "../middleware/uploadMiddleware.js";
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/email/:email', getUserByEmail);


// http://localhost:5005/api/users/:id
userRouter.get('/get-user',protect, getUser)

// http://localhost:5005/api/users/:id
userRouter.put('/update-user',protect, updateUser)

// http://localhost:5005/api/users/:id
userRouter.delete('/delete-user',protect, deleteUser)

// http://localhost:5005/api/users/circle/:circleId
userRouter.get('/circle/:circleId',protect, getUsersByCircle)

userRouter.post('/send-contact-query', sendContactMail)

userRouter.post("/upload", upload.single("image"),protect,  uploadProfileImage);



export default userRouter
