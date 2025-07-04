import express from "express"
import { loginByEmail, registerByEmail, googleByLogin, forgotPassword, resetPassword, logoutUser } from "../controllers/authControllers.js";

const authRouter = express.Router();

// http://localhost:5005/api/auth/login - DONE
authRouter.post('/login',loginByEmail)

// http://localhost:5005/api/auth/register - DONE
authRouter.post('/register',registerByEmail)

authRouter.post("/logout", logoutUser)

// http://localhost:5005/api/auth/google
authRouter.post('/google', googleByLogin)

//http://localhost:5005/api/auth/forgot-password
authRouter.post('/forgot-password', forgotPassword)

//http://localhost:5005/api/auth/reset-password
authRouter.post('/reset-password', resetPassword);

export default authRouter;