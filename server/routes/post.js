import {v2 as cloudinary} from 'cloudinary';
import express from "express";          
cloudinary.config({ 
  cloud_name: 'dstuydov6', 
  api_key: '125869395571342', 
  api_secret: 'ww0zNR7pPHNuNMNvYMaUQL_Vv-U' 
});
const router=express.Router();

router.post("/createPost",async(req,res)=>{
    const {image}=req.body
    try {
        const uploadedImage=await cloudinary.uploader.upload(image,{
            folder:"User images",
            public_id:"1"
        })
        console.log(uploadedImage)
        return res.status(200).json({success:true,uploadedImage})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
})

export default router;
