import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import ProfileInfo from "../models/ProfileInfo.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
dotenv.config;

export const createUser = async (req, res) => {
  try {
    const { user, fullname, password, username, dob } = req.body;
    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };
    const phoneRegex = /^[0-9]{10}$/;
    if (!isValidEmail(user) && !phoneRegex.test(user)) {
      return res
        .status(400)
        .json({ error: "Either email or mobile number is required" });
    }

    //checking validation result
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send({ errors: result.array() });

    const userExist = await User.findOne({ user });
    if (userExist)
      return res.status(409).json({ success: false, res: "User allery exist" });

    //password hashing
    const hash = bcrypt.hashSync(password, 10);

    //creating new user
    const newUser = await User({
      user: user,
      fullname: fullname,
      password: hash,
      username: username,
      dob: new Date(dob),
    });
    await newUser.save();
    const payLoad = {
      user,
      _id: newUser._id,
    };
    const token = jwt.sign(payLoad, process.env.JWT_SIGN);
    const profileInfo = await ProfileInfo({ userId: newUser._id });
    await profileInfo.save();
    return res.status(200).json({ success: true, res: token });
  } catch (error) {
    console.log("Intrenal server error at auth controller🔴 ", error);
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { user, password } = req.body;
    const ifuserExist = await User.findOne({ user });
    if (!ifuserExist) {
      return res.status(404).json({ success: false, res: "User not found" });
    }
    const isCorrectPass = bcrypt.compare(password, ifuserExist.password);
    if (isCorrectPass) {
      const payLoad = {
        user,
        _id: ifuserExist._id,
      };
      const token = jwt.sign(payLoad, process.env.JWT_SIGN);
      return res.status(200).json({ success: true, res: token });
    } else {
      return res
        .status(404)
        .json({ success: false, res: "Incorrect credentials" });
    }
  } catch (error) {
    console.log("Intrenal server error 🔴 ", error);
  }
};
