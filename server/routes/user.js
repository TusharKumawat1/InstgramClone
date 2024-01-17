import express from "express";
import { searchUser } from "../controller/user.js";
const route = express.Router();
route.get("/searchUser", searchUser);
export default route;
