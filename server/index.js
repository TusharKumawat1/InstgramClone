import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth.js";
import connectToDB from "./config/dbConfig.js";
import { expressMiddleware } from "@apollo/server/express4";
import server from "./routes/smapleGQL.js";
import posts from "./routes/post.js";
import editProfile from "./routes/editProfile.js";
import users from "./routes/user.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
dotenv.config();
async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  await connectToDB();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req }) => {
        const { token } = req.headers;
        if (!token) throw new Error("Please send token");
        try {
          let decoded = jwt.verify(token, process.env.JWT_SIGN);
          return decoded
        } catch (error) {
          console.log(error);
        }
      },
    })
  );
  app.use("/auth", userRouter);
  app.use("/posts", authMiddleware, posts);
  app.use("/profile", authMiddleware, editProfile);
  app.use("/users", authMiddleware, users);
  app.get("/", (req, res) => res.send("Healthy! 🟢"));
  app.listen(process.env.PORT, () => console.log("server started 🟢"));
}
startServer();
