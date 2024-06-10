const express = require("express");
const { mongo, mongoose } = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error!");
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
