import { ApolloServer } from "@apollo/server";
import ProfileInfo from "../models/ProfileInfo.js";
const server = new ApolloServer({
  typeDefs: `
        type user{
            username:String
            dob:String
            user:String
            fullname:String
        } 
        type profileInfos {
            _id:String
            userId:user
            bio:String
            pfp:String
        }
        type Query{
            getPfInfo(userId: String): profileInfos
        }
    `,
  resolvers: {
    Query: {
      getPfInfo: async (_, req) => {
        try {
            console.log(req)
          const pfInfo = await ProfileInfo.findOne({
            userId: req.userId,
          }).populate({ path: "userId", select: "-password" });

          console.log(pfInfo);
          return pfInfo;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});
await server.start();
export default server;
