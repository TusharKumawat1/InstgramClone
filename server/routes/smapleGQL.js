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
            pfp:String
        } 
        type Error {
            message: String!
          }
        type profileInfos {
            _id:String
            userId:user
            bio:String
            pfp:String
            follower:[user]
            following:[user]
            posts:[String]
        }
        type ProfileInfoResponse {
            data: profileInfos
            errors: [Error]
          }
        type Query{
            getPfInfo(token: String): ProfileInfoResponse
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
              path:"follower",
              select:"-password"
            })
            if (!ifValidUser) {
                throw new Error("wrong token");
            }
            return { data: ifValidUser, errors: null };
        } catch (error) {
            return { errors: [{ message: error.message }] };
        }
      },
    },
  },
});
await server.start();
export default server;
