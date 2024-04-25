const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const { create, getPosts, deletePost } = require("../controllers/postController");
const router = express.Router();
router.post("/create", verifyToken, create);
router.get("/getPosts", verifyToken, getPosts);
router.delete("/deletePost/:postId", verifyToken, deletePost);

module.exports = router