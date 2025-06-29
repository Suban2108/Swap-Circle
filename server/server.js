import express from "express"
import cors from "cors"
import path from "path"
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

import 'dotenv/config'


//app config
const app = express();

const PORT = process.env.PORT || 5005;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
  // app.use('/api/stats',statsRouter);
  // app.use('/api/admin',adminRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Swap Circle' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
