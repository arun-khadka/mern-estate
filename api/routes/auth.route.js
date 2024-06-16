import express, { application } from "express";
import { check } from "express-validator";
import { signup, signin } from "../controllers/auth.controller.js";

const router = express.Router();

// Custom email validator function using RegExp
const isValidEmail = (value) => {
  // Regular expression for a more precise email format check
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Please include a valid email").custom(isValidEmail),
    check("password", "Password is required").exists(),
  ],
  signin
);

export default router;
