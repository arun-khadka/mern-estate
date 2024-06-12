import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error!", err);
  });

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
