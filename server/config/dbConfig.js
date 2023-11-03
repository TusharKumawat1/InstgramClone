import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database 🤖")
    } catch (error) {
        console.log("⚠️ Error accured while connecting to database : ",error)
    }
}
export default connectToDB;