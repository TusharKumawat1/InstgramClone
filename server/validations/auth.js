import { body } from "express-validator";

export const createUserValidations = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("fullname", "Enter a valid fullname").isLength({ min: 1 }),
  body("password", "At least 8 characters").isLength({ min: 8 }),
];
export const loginValidations = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("email", "Enter a valid emali").isEmail(),
  body("password", "Atleast 8 characters").isLength({ min: 8 }),
];
