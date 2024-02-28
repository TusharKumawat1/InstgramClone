import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
export const Context=async({req})=>{
    const {token}=req.headers
    if (!token) throw new Error("Please send token") 
     try {
        let decoded=jwt.verify(token, process.env.JWT_SIGN)
        console.log(decoded)
     } catch (error) {
        console.log(error)
     }
  }