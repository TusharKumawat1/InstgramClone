import express from "express";          
import { editProfileAttributes } from "../controller/editProfile.js";

const router=express.Router();

router.put("/editProfile",editProfileAttributes)

export default router;
