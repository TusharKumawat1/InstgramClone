import { ApolloServer } from "@apollo/server";
import ProfileInfo from "../models/ProfileInfo.js";
import mongoose from "mongoose";
const server = new ApolloServer({
  typeDefs: `
        type sayHello {
            message:String
        }
        type profileInfos {
            _id:String
            userId:String
            bio:String
            pfp:String
        }
        type Query{
            saySomething: sayHello
            say:String
            getPfInfo(userId: String): profileInfos
        }
    `,
  resolvers: {
    Query: {
      saySomething: () => {
        return { message: "hellow world" };
      },
      say:()=>"bye bye",
      getPfInfo:async(_,req)=>{
        const pfInfo = await ProfileInfo.findOne({ userId:req.userId });
        console.log(userId)
        return pfInfo
      }
    },
  },
});
await server.start();
export default server