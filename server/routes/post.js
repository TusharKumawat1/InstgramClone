import express from "express";          
import { createPost, likeOrDislikePost } from "../controller/post.js";

const router=express.Router();

router.post("/createPost",createPost)
router.post("/likeOrDislikePost",likeOrDislikePost)

export default router;
