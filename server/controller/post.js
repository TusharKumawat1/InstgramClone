import mongoose from "mongoose"
import ProfileInfo from "../models/ProfileInfo.js"
import User from "../models/User.js"

export const createPost=async(req,res)=>{
    try {
     const userExist=await User.findById({_id:req.user._id})
     if (userExist) {
        const UserProfile=await ProfileInfo.findOne({userId:userExist._id})
        const newPost={...req.body}
        newPost["date"]=new Date();
        newPost["postId"]=new mongoose.Types.ObjectId()
        UserProfile.posts.push(newPost)
        UserProfile.save();
        return res.status(200).json({success:true,message:"Post created successfully"})
     }else{
        return res.status(404).json({success:false,message:"user not found"})
     }
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}
export const likePost=async(req,res)=>{
    try {
        const {profileId,postId}=req.body;
        const user=await User.findById({_id:req.user._id})
        if (!user) {
            return res.status(404).json({success:false,message:"not valid user"})
        }
        const userProfile=await ProfileInfo.findOne({_id:profileId})
        if (!userProfile) {
            return res.status(404).json({success:false,message:"user not found"})
        }
        const foundPost = userProfile.posts.find((post) =>post.postId.equals(postId));
        if (!foundPost.likes) {
            foundPost.likes=[]
        }
        foundPost?.likes?.push(req.user._id)
        userProfile.save();
        return res.status(200).json({success:true,message:"liked successfully",})

    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

