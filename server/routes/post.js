import express from "express";          
import { createPost } from "../controller/post.js";

const router=express.Router();

router.post("/createPost",createPost)

export default router;
