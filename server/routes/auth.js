import express from "express";
import { createUser, loginUser } from "../controller/auth.js";
import {
  createUserValidations,
  loginValidations,
} from "../validations/auth.js";
const router = express.Router();
try {
  router.post("/createUser", createUserValidations, createUser);
  router.post("/loginUser", loginValidations, loginUser);
} catch (error) {
    console.log("Intrenal server error at auth route 🔴 ", error);
}
export default router;
