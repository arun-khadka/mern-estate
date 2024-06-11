import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use("/api/user", userRouter);

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error!");
  });

//test api
app.get("/", (req, res) => {
res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
