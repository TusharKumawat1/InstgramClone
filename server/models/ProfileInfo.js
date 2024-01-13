import mongoose from "mongoose";
const { Schema } = mongoose;

const profileInfoSchema = new Schema(
  {
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    gender:String,
    pfp: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png",
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
        ref: "ProfileInfo",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProfileInfo",
      },
    ],
    posts:[Schema.Types.Mixed],
    accountType: {
      type: String,
      default: "public",
    },
  },
  { timestamps: true, minimize: false }
);
const ProfileInfo = mongoose.model("ProfileInfo", profileInfoSchema);
export default ProfileInfo;
