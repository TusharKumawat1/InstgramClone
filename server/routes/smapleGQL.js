import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getPostDetails,getPfInfo } from "../controller/graphQl.js";
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
        type commentedBy{
          profileId:String,
          pfp:String,
          username:String
        }
        type comment{
          commentedBy:commentedBy
          content:String
          date:String
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
          comments:[ comment]
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
            gender:String
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
          type Mutation {
            likeOrDislikePost(profileId: String, postId: String): LikeOrDislikePostResponse
          }
          
          type LikeOrDislikePostResponse {
            success: Boolean!
            message: String
          }
        type Query{
            getPfInfo(token: String): ProfileInfoResponse
            getPostDetails(userProfileId: String,postId:String):postDetails
        }
    `,
  resolvers: {
    Query: {
      getPfInfo: getPfInfo,
      getPostDetails: getPostDetails,
    },
    // Mutation:{
    //   likeOrDislikePost:[authMiddleware,likeOrDislikePost]
    // }
  },
});
await server.start();
export default server;
