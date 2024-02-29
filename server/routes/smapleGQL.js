import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv"
import { getPfInfo, searchProfile } from "../controller/user.js";
import { getFeed, getPostDetails } from "../controller/post.js";
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
        type likes{
          _id:String
          pfp:String
          username:String
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
          likes:[likes]
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
            FriendRequests:[profileInfos]
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
          type feed{
            username:String
            profileId:String
            userId:String
            pfp:String
            post:post
          }
        type Query{
            getPfInfo(token: String): ProfileInfoResponse
            getPostDetails(userProfileId: String,postId:String):postDetails
            searchProfile(profileId:String,token:String):ProfileInfoResponse
            getFeed:[feed]
        }
    `,
  resolvers: {
    Query: {
      getPfInfo: getPfInfo,
      getPostDetails: getPostDetails,
      searchProfile:searchProfile,
      getFeed:getFeed
    },
  },
  
});
await server.start();
export default server;
