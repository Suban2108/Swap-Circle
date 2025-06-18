import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
// import authRouter from "./routes/authRoutes.js"

import 'dotenv/config'


//app config
const app = express();

const PORT = process.env.PORT || 5005;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db Connection
connectDB();

//API Endpoints
  // app.use('/api/auth', authRouter);
  // app.use('/api/items', itemRouter);
  // app.use('/api/users',userRouter);
  // app.use('/api/circles',circleRouter);
  // app.use('/api/offer', offerRouter);
  // app.use('/api/requests',requestsRouter);
  // app.use('/api/chat',chatRouter);
  // app.use('/api/karma',karmaRouter);
  // app.use('/api/events',eventRouter);
  // app.use('/api/stats',statsRouter);
  // app.use('/api/admin',adminRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Swap Circle' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
