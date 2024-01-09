import { ApolloServer } from "@apollo/server";
import ProfileInfo from "../models/ProfileInfo.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const server = new ApolloServer({
  typeDefs: `
        type user{
            username:String
            dob:String
            user:String
            fullname:String
            _id:String
        } 
        type Error {
            message: String!
          }
        type advancedSetting{
          hideLikeAndView:Boolean
          hideComments:Boolean
        }
        type appliedFilters{
          imageIndex:Int
          filter:String
        }
        type comment{
          userId:String
          content:String
          likes:[String]
          reply:[comment]
        }
        type post{
          content:[String]
          caption:String
          location:String
          aspectRatio:String
          postId:String
          advancedSetting:advancedSetting
          appliedFilters:[appliedFilters]
          date:String
          likes:[String]
          comments:[comment]
        }
        type profileInfos {
            _id:String
            userId:user
            bio:String
            links:String
            pfp:String
            followers:[profileInfos]
            following:[profileInfos]
            accountType:String
            posts:[post]
        }
        type ProfileInfoResponse {
            data: profileInfos
            errors: [Error]
          }
          type postDetails {
            userDetails:profileInfos
            postDetails: post
            errors: [Error]
          }
        type Query{
            getPfInfo(token: String): ProfileInfoResponse
            getPostDetails(userProfileId: String,postId:String):postDetails
        }
    `,
  resolvers: {
    Query: {
      getPfInfo: async (_, req) => {
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
      },
      getPostDetails: async (_, req) => {
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
      },
    },
  },
});
await server.start();
export default server;
