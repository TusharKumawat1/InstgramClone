import express from "express";          
import { addComment, createPost, likeOrDislikePost,  } from "../controller/post.js";

const router=express.Router();

router.post("/createPost",createPost)
router.put("/likeOrDislikePost",likeOrDislikePost)
router.put("/addComment",addComment)

export default router;
