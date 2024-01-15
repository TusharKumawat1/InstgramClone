import { MongoClient } from "mongodb";
import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
export const editProfileAttributes = async (req, res) => {
  try {
    const { profileAttributes } = req.body;
    const userExist = await User.findById({ _id: req.user._id });
    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const userProfile = await ProfileInfo.findOne({ userId: req.user._id });
    if (profileAttributes.link) userProfile.links = profileAttributes.link;
    if (profileAttributes.accountType) userProfile.accountType = profileAttributes.accountType;
    if (profileAttributes.gender) userProfile.gender = profileAttributes.gender;
    if (profileAttributes.bio) userProfile.bio = profileAttributes.bio;
    if (profileAttributes.pfp) {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const database = client.db("instagramClone");
      const collection = database.collection("profileinfos");
      await collection.updateMany(
        { "posts.comments.commentedBy.profileId": userProfile._id },
        {
          $set: {
            "posts.$[].comments.$[comment].commentedBy.pfp":
              profileAttributes.pfp,
          },
        },
        { arrayFilters: [{ "comment.commentedBy.profileId": userProfile._id }] }
      );
      await client.close();
    }
    await userProfile.save();
    return res
      .status(200)
      .json({ success: true, message: "change successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  } finally {
    await client.close();
  }
};
