import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const getPfInfo=async(_, req) => {
    try {
        const {token}=req;
        if (!token) {
            throw new Error("Please provide a token");
        }
        const decoded=jwt.verify(token,process.env.JWT_SIGN)
        const ifValidUser=await ProfileInfo.findOne({userId:decoded._id}).populate({
            path:"userId",
            select:"-password"
        }).populate({
          path:"followers",
          select:"-password"
        })
    
        
        if (!ifValidUser) {
          throw new Error("wrong token");
        }
        ifValidUser.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        return { data: ifValidUser, errors: null };
    } catch (error) {
        return { errors: [{ message: error.message }] };
    }
  }

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
// export const likeOrDislikePost = async (_, { profileId, postId }, { req, res }) => {
//  try {
//     const ValidUser = await User.findById({ _id: req.user._id });
//     console.log(profileId,postId,req)
//     if (!ValidUser) {
//       return { success: false, message: "Not a valid user" };
//     }
//     const userProfile = await ProfileInfo.findOne({ _id: profileId });
//     if (!userProfile) {
//       return { success: false, message: "User not found" };
//     }
//     const foundPostIndex = userProfile.posts.findIndex((post) =>
//       post.postId.equals(postId)
//     );
//     if (foundPostIndex === -1) {
//       return { success: false, message: "Post not found" };
//     }
//     if (!userProfile?.posts[foundPostIndex]?.likes?.includes(req.user._id)) {
//       userProfile?.posts[foundPostIndex]?.likes?.push(req.user._id);
//       userProfile.markModified("posts");
//       await userProfile.save();
//       return { success: true, message: "Post Liked" };
//     } else {
//       const userIndex = userProfile.posts[foundPostIndex].likes.indexOf(
//         req.user._id
//       );
//       userProfile.posts[foundPostIndex]?.likes?.splice(userIndex, 1);
//       userProfile.markModified("posts");
//       await userProfile.save();
//       return { success: true, message: "Post DisLiked" };
//     }
//  } catch (error) {
//     console.log(error)
//     return { success: false, message: "An error occurred while processing your request" };
//  }
// };
