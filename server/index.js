import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

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

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Swap Circle' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
