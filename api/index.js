const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const uri = process.env.ATLAS_URI;
app.listen(3000, () => {
  console.log("Server running in port 3000!");
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
