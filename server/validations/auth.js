import { body } from "express-validator";
import {phone} from 'phone';

export const createUserValidations = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("fullname", "Enter a valid fullname").isLength({ min: 1 }),
  body("password", "At least 8 characters").isLength({ min: 8 }),
  body()
    .custom((value, { req }) => {
      if (!req.body.email && !req.body.mobileNO) {
        throw new Error("Either email or mobile number is required");
      }
      if (req.body.email) {
        if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && req.body.email.includes(" ")) {
          throw new Error("Enter a valid email");
        }else{
          return true
        }
      }
      if (req.body.mobileNO) {
        if (!phone(req.body.mobileNO,{country: req.body.countryCode}).isValid) {
          throw new Error("Enter a valid mobile number with 10 digits");
        }else{
          return true
        }
      }
    }),
];
export const loginValidations = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("email", "Enter a valid emali").isEmail(),
  body("password", "Atleast 8 characters").isLength({ min: 8 }),
];
