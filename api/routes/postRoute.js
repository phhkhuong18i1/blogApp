const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const { create, getPosts } = require("../controllers/postController");
const router = express.Router();
router.post("/create", verifyToken, create);
router.get("/getPosts", verifyToken, getPosts);

module.exports = router