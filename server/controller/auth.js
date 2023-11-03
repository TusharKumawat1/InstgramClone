import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import ProfileInfo from "../models/ProfileInfo.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
dotenv.config;

export const createUser = async (req, res) => {
  try {
    const { email, fullname, password, username, mobileNO, dob ,countryCode} = req.body;

    if (!email && !mobileNO)
      res
        .status(400)
        .json({ error: "Either email or mobile number is required" });

    //checking validation result
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send({ errors: result.array() });

    const userExist = await User.findOne({ email });
    if (userExist)
      res.status(409).json({ success: false, res: "User allery exist" });

    //password hashing
    const hash = bcrypt.hashSync(password, 10);

    //creating new user
    const newUser = await User({
      email: email ? email : undefined,
      mobileNO: mobileNO ? Number(mobileNO) : undefined,
      fullname: fullname,
      password: hash,
      username: username,
      dob: new Date(dob),
    });
    const payLoad = {
      email,
      password,
      username,
    };
    await newUser.save();
    const token = jwt.sign(payLoad, process.env.JWT_SIGN);
    const profileInfo=await ProfileInfo({userId:newUser._id})
    await profileInfo.save();
    return res.status(200).json({ status: 200, res: token });
  } catch (error) {
    console.log("Intrenal server error at auth controller🔴 ", error);
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist)
      res.status(404).json({ success: false, res: "User not found" });

    const payLoad = {
      email,
      password,
      username,
    };
    const token = jwt.sign(payLoad, process.env.JWT_SIGN);
    return res.status(200).json({ status: 200, res: token });
  } catch (error) {
    console.log("Intrenal server error 🔴 ", error);
  }
};
