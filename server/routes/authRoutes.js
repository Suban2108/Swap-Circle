import express from "express"
import { loginByEmail, registerByEmail, logout, inviteNewUser, getCurrentUser } from "../controllers/authControllers.js";

const authRouter = express.Router();

// http://localhost:5005/api/auth/login - DONE
authRouter.post('/login',loginByEmail)

// http://localhost:5005/api/auth/register - DONE
authRouter.post('/register',registerByEmail)

// http://localhost:5005/api/auth/logout
authRouter.post('/logout', logout)

// http://localhost:5005/api/auth/invite
authRouter.post('/invite', inviteNewUser)

// http://localhost:5005/api/auth/current-user
authRouter.get('/current-user', getCurrentUser)



export default authRouter;