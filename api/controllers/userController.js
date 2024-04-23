const User = require("../Models/UserModel");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcrypt");
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
  );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
     next(error)
  }
};

const deleteUser = async(req, res, next) => {
  if(req.user.id !== req.params.userId)
  {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json("Xóa tài khoản thành công");
  } catch (error) {
    next(error)
  }
}

module.exports = { updateUser, deleteUser };
