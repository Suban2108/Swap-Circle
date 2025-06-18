// Modified connection string with URL encoded password:
import mongoose from "mongoose"
import 'dotenv/config'


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

//Suban@2004
//Suban%402004