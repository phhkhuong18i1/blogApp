const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "https://blogapp-w020.onrender.com" }));
app.use(cookieParser());
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server running in port 4000!");
});
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));

const ___dirname = path.resolve();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use(express.static(path.join(___dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(___dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
