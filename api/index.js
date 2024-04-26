const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute")
const commentRouter = require("./routes/commentRoute")
const cookieParser = require("cookie-parser")
const cors = require('cors')
dotenv.config();
const app = express();  
app.use(express.json())
app.use(cors({credentials: true, origin: "http://localhost:5173"}))
app.use(cookieParser())
app.listen(4000, () => {
  console.log("Server running in port 4000!");
});
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));

  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/comments", commentRouter);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
  })
