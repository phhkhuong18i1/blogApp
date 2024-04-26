const express = require("express");
const { updateUser, deleteUser, signOut, getUsers, getUser } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post('/signOut', signOut);
router.get('/getUsers', verifyToken, getUsers)
router.get('/:userId', getUser)
module.exports = router;
