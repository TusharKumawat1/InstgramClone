import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const searchUser = async (req, res) => {
  try {
    const keyWord = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { fullname: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const searchResult = await User.find(keyWord).find({
      _id: { $ne: req.user._id },
    });
    if (searchResult.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const result = await Promise.all(
      searchResult.map(async (result) => {
        const userProfile = await ProfileInfo.findOne({ userId: result._id })
          .select(["_id", "userId", "pfp"])
          .populate({
            path: "userId",
            select: ["fullname", "username"],
          });
        return userProfile;
      })
    );
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ success: false, error: error });
  }
};

export const getPfInfo = async (_, req) => {
  try {
    const { token } = req;
    if (!token) {
      throw new Error("Please provide a token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const ifValidUser = await ProfileInfo.findOne({ userId: decoded._id })
      .populate({
        path: "userId",
        select: "-password",
      })
      .populate({
        path: "followers",
        select: "-password",
      });

    if (!ifValidUser) {
      throw new Error("wrong token");
    }
    ifValidUser.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: ifValidUser, errors: null };
  } catch (error) {
    return { errors: [{ message: error.message }] };
  }
};
export const searchProfile = async (_, args) => {
  try {
    const { token, profileId } = args;
    if (!token) {
      throw new Error("Please provide a token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const user = await User.findById({ _id: decoded._id });
    if (!user) {
      return { errors: [{ message: "Not Authenticated" }] };
    }
    const profileData = await ProfileInfo.findById({ _id: profileId }).populate(
      {
        path: "userId",
        select: "-password",
      }
    );
    if (!profileData) {
      return { errors: [{ message: "User Not found" }] };
    }
    profileData.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: profileData, errors: null };
  } catch (error) {
    console.log(error);
  }
};
export const follow=async(req,res)=>{
try {
  const {follow}=req.body
  console.log(follow)
  console.log(req.user._id)
  if (!follow) return res.status(400).json({success:false,message:"send the id of user"})
  const user=await User.findById({_id:req.user._id})
  const userProfile=await ProfileInfo.findOne({userId:req.user._id})
  if (!user) return res.status(400).json({success:false,message:"Not Authorized"})
  const followee=await ProfileInfo.findById({_id:follow})
  if (!followee) return res.status(404).json({success:false,message:" User Not found"})
  followee.followers.push(req.user._id)
  userProfile.following.push(followee.userId._id)
  await followee.save();
  await userProfile.save();
  return res.status(200).json({success:true,message:"Follow Successful"})
} catch (error) {
  console.log(error)
  return res.status(500).json({success:false,message:"Internal Server Error"})
}
}
export const Unfollow=async(req,res)=>{
try {
  const {unfollow}=req.body
  const user=await User.findById({_id:req.user._id})
  const userProfile=await ProfileInfo.findOne({userId:req.user._id})
  if (!user) return res.status(400).json({success:false,message:"Not Authorized"})
  const unfollowing=await ProfileInfo.findById({_id:unfollow})
  if (!unfollowing) return res.status(404).json({success:false,message:" User Not found"})
  unfollowing.followers.splice(req.user._id,1)
  userProfile.following.splice(unfollowing.userId._id,1)
  await unfollowing.save();
  await userProfile.save();
  return res.status(200).json({success:true,message:"Unfollow Successful"})
} catch (error) {
  return res.status(500).json({success:false,message:"Internal Server Error"})
}
}
export const FriendRequest=async(req,res)=>{
  try {
    const {follow}=req.body
    console.log(follow)
    const user=await User.findById({_id:req.user._id})
    if (!user) return res.status(400).json({success:false,message:"Not Authorized"})
    const followee=await ProfileInfo.findById({_id:follow})
    if (!followee) return res.status(404).json({success:false,message:" User Not found"})
    followee.FriendRequests.push(req.user._id)
    await followee.save();
    return res.status(200).json({success:true,message:"Request sent"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"Internal Server Error"})
  }
}