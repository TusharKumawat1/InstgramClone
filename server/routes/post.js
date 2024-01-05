import express from "express";          
import { createPost, likePost } from "../controller/post.js";

const router=express.Router();

router.post("/createPost",createPost)
router.post("/likePost",likePost)

export default router;
