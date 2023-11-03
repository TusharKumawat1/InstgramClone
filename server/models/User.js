import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    mobileNO: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
   
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
