const express = require("express");
const { createComment, getComments, likeComment, editComment, deleteComment, listComments } = require("../controllers/commentController");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
router.post('/create', verifyToken ,createComment);
router.get('/getComments/:postId' ,getComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
router.get('/listComments', verifyToken, verifyToken, listComments)

module.exports = router;