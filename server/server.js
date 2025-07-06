import express from "express"
import cors from "cors"
import path from "path"
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url'
import { connectDB } from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import circleRouter from "./routes/circleRoutes.js"
import itemRouter from "./routes/itemRoutes.js"
import offerRouter from "./routes/offerRoutes.js"
import requestsRouter from "./routes/requestRoutes.js"
import chatRouter from "./routes/chatRoutes.js"
import karmaRouter from "./routes/karmaRoutes.js"
import eventRouter from "./routes/eventRoutes.js"
import conversationRouter from "./routes/conversationRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import errorHandler from "./middleware/errorHandlerMiddleware.js"

import 'dotenv/config'
import { log } from "console";


//app config
const app = express();

const PORT = process.env.PORT || 5005;


//middleware
app.use(cors({
  origin: 'https://swap-circle-frontend.onrender.com',
  credentials: true, // 👈 allows cookies to be sent
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Make uploads folder publicly accessible
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/default', express.static(path.join(__dirname, 'default')));



//db Connection
connectDB();

//API Endpoints
  app.use('/api/auth', authRouter);
  app.use('/api/items', itemRouter);
  app.use('/api/users',userRouter);
  app.use('/api/circles',circleRouter);
  app.use('/api/offers', offerRouter);
  app.use('/api/requests',requestsRouter);
  app.use('/api/chat',chatRouter);
  app.use('/api/karma',karmaRouter);
  app.use('/api/events',eventRouter);
  app.use('/api/conversations', conversationRouter)
  app.use('/api/messages', messageRouter)
  // app.use('/api/stats',statsRouter);
  // app.use('/api/admin',adminRouter);

// Error handler middleware (should be after all routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
