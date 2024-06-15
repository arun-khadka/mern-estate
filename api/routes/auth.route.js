import express from "express";
import { check, validationResult } from "express-validator";
import { signup, signin } from "../controllers/auth.controller.js";

const router = express.Router();

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
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  signin
);

export default router;
