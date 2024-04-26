const express = require("express");
const { createComment, getComments, likeComment } = require("../controllers/commentController");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
router.post('/create', verifyToken ,createComment);
router.get('/getComments/:postId' ,getComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)

module.exports = router;