import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";
export const searchUser = async (req, res) => {
  try {
    const keyWord = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { fullname: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const searchResult = await User.find(keyWord).find({
      _id: { $ne: req.user._id },
    });
    if (searchResult.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const result = await Promise.all(
      searchResult.map(async (result) => {
        const userProfile = await ProfileInfo.findOne({ userId: result._id })
          .select(["_id", "userId", "pfp"])
          .populate({
            path: "userId",
            select: ["fullname", "username"],
          });
        return userProfile;
      })
    );
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ success: false, error: error });
  }
};

export const getPfInfo = async (_, req) => {
  try {
    const { token } = req;
    if (!token) {
      throw new Error("Please provide a token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const ifValidUser = await ProfileInfo.findOne({ userId: decoded._id })
      .populate({
        path: "userId",
        select: "-password",
      })
      .populate({
        path: "followers",
        select: "-password",
      });

    if (!ifValidUser) {
      throw new Error("wrong token");
    }
    ifValidUser.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: ifValidUser, errors: null };
  } catch (error) {
    return { errors: [{ message: error.message }] };
  }
};
export const searchProfile = async (_, args) => {
  try {
    const { token, profileId } = args;
    if (!token) {
      throw new Error("Please provide a token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const user = await User.findById({ _id: decoded._id });
    if (!user) {
      return { errors: [{ message: "Not Authenticated" }] };
    }
    const profileData = await ProfileInfo.findById({ _id: profileId }).populate(
      {
        path: "userId",
        select: "-password",
      }
    );
    if (!profileData) {
      return { errors: [{ message: "User Not found" }] };
    }
    return { data: profileData, errors: null };
  } catch (error) {
    console.log(error);
  }
};
