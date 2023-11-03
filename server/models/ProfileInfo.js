import mongoose from "mongoose";
const { Schema } = mongoose;

const profileInfoSchema = new Schema(
  {
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    pfp: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ADefault_pfp.jpg&psig=AOvVaw27EIfEtRBasmHePx2Vdrhi&ust=1699006225681000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOiussiJpYIDFQAAAAAdAAAAABAD",
    },
    bio: {
      type: String,
      default:""
    },
    links: {
      type: String,
      default:""
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: Array,
    accountType: {
      type: String,
      default: "public",
    },
  },
  { timestamps: true, minimize: false }
);
const ProfileInfo = mongoose.model("ProfileInfo", profileInfoSchema);
export default ProfileInfo;
