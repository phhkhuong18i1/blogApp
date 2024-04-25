const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const { create, getPosts, deletePost, updatePost } = require("../controllers/postController");
const router = express.Router();
router.post("/create", verifyToken, create);
router.get("/getPosts", verifyToken, getPosts);
router.delete("/deletePost/:postId", verifyToken, deletePost);
router.put("/update/:postId", verifyToken, updatePost)
module.exports = router