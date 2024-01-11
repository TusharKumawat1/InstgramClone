import express from "express";          
import { addComment, createPost, likeOrDislikePost,  } from "../controller/post.js";

const router=express.Router();

router.post("/createPost",createPost)
router.post("/likeOrDislikePost",likeOrDislikePost)
router.post("/addComment",addComment)

export default router;
