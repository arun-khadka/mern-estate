import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  // console.log(req.body);

  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully!", success: true });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return next(errorHandler(400, "Email already exists"));
    }
    next(errorHandler(500, error.message || "Something went wrong!"));
  }
};

export const signin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentails!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Logged in successfully!", success: true, user: rest });
  } catch (error) {
    next(errorHandler(500, error.message || "Something went wrong!"));
  }
};
