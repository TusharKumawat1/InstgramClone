import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/auth.js";
import connectToDB from "./config/dbConfig.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
await connectToDB();
app.use("/auth",userRouter)

app.get("/",(req,res)=>res.send("Healthy! 🟢"))
app.listen(process.env.PORT,()=>console.log("server started 🟢"))
