import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth.js";
import connectToDB from "./config/dbConfig.js";
import { expressMiddleware } from "@apollo/server/express4";
import server from "./routes/smapleGQL.js";
dotenv.config();
async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  await connectToDB();
  app.use("/graphql", expressMiddleware(server));
  app.use("/auth", userRouter);
  app.get("/", (req, res) => res.send("Healthy! 🟢"));
  app.listen(process.env.PORT, () => console.log("server started 🟢"));
}
startServer();
