import mongoose, { now } from "mongoose";
import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const userExist = await User.findById({ _id: req.user._id });
    if (userExist) {
      const UserProfile = await ProfileInfo.findOne({ userId: userExist._id });
      const newPost = { ...req.body };
      newPost["date"] = new Date();
      newPost["postId"] = new mongoose.Types.ObjectId();
      UserProfile.posts.push(newPost);
      UserProfile.save();
      return res
        .status(200)
        .json({ success: true, message: "Post created successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
export const likeOrDislikePost = async (req, res) => {
  try {
    const { profileId, postId } = req.body;
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "not valid user" });
    }
    const userProfile = await ProfileInfo.findOne({ _id: profileId });
    if (!userProfile) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const foundPostIndex = userProfile.posts.findIndex((post) =>
      post.postId.equals(postId)
    );
    if (foundPostIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    if (!userProfile.posts[foundPostIndex]?.likes?.includes(req.user._id)) {
      userProfile.posts[foundPostIndex]?.likes?.push(req.user._id);
      userProfile.markModified("posts");
      await userProfile.save();
      return res
        .status(200)
        .json({ success: true, message: "liked successfully" });
    } else {
      const userIndex = userProfile.posts[foundPostIndex].likes.indexOf(
        req.user._id
      );
      userProfile.posts[foundPostIndex]?.likes?.splice(userIndex, 1); //remove this user
      userProfile.markModified("posts");
      await userProfile.save();
      return res
        .status(200)
        .json({ success: true, message: "disliked successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
export const addComment = async (req, res) => {
  try {
    const { profileId, postId, commentContent } = req.body;
    const user = await ProfileInfo.findOne({ userId: req.user._id }).populate({
        path:"userId",
        select:"-password"
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "not valid user" });
    }
    const userProfile = await ProfileInfo.findOne({ _id: profileId });
    if (!userProfile) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const foundPostIndex = userProfile.posts.findIndex((post) =>
      post.postId.equals(postId)
    );
    if (foundPostIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    const data = {
      commentedBy: {
        profileId:user._id,
        pfp:user.pfp,
        username:user.userId.username
      },
      content: commentContent,
      date: new Date(),
    };
    userProfile?.posts[foundPostIndex]?.comments.push(data);
    userProfile.markModified("posts");
    await userProfile.save();
    return res
      .status(200)
      .json({ success: true, message: "comment successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error" });
  }
};
export const getPostDetails=async (_, req) => {
  try {
    const { userProfileId, postId } = req;
    if (!userProfileId) {
      throw new Error("Please Provide a user");
    }
    const validProfile = await ProfileInfo.findOne({
      _id: userProfileId,
    }).populate({
      path: "userId",
      select: "-password",
    });
    if (!validProfile) {
      throw new Error("User not found");
    }
    const postDetails=validProfile.posts.filter(post=>post.postId.equals(postId))
    if (!postDetails) {
      throw new Error("Post not found")
    }
    return { userDetails:validProfile ,postDetails : postDetails[0], errors: null };
  } catch (error) {
    return { errors: [{ message: error.message }] };
  }
}