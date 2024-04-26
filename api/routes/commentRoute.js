const express = require("express");
const { createComment, getComments } = require("../controllers/commentController");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
router.post('/create', verifyToken ,createComment);
router.get('/getComments/:postId' ,getComments);


module.exports = router;