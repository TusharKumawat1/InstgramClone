import express from "express";
import { FriendRequest, Unfollow, follow, searchUser } from "../controller/user.js";
const route = express.Router();
route.get("/searchUser", searchUser);
route.post("/follow", follow);
route.post("/unfollow", Unfollow);
route.post("/friendRequest", FriendRequest);
export default route;
