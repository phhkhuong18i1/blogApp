const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require("validator");
const { errorHandler } = require("../utils/error");
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return next(errorHandler(400, "Tất cả cac trường là bắt buộc"));

  if (!validator.isEmail(email))
    return next(errorHandler(400, "vui lòng nhập đúng định dạng email"));

  const user = await User.findOne({ email });

  if (user) return next(errorHandler(400, "Email đã tồn tại"));

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Đăng ký thành công" });
  } catch (error) {
    next(error);
  }
};

//signin

const signIn = async(req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(errorHandler(500, "Tất cả các trường là bắt buộc"));

    try {
      const user  = await User.findOne({email})
      if(!user)
      {
        return next(errorHandler(400, "Không tìm thấy user"));
      }

      const validPassword = bcrypt.compare(password, user.password)
      if(!validPassword)
      {
        return next(errorHandler(400, "Mật khẩu sai"));
      }

      const {password: pass, ...rest} = user._doc;

      const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
      },process.env.JWT_SECRET)
     res.status(200).cookie('access_token', token, {
      httpOnly: true
     }).json(rest)
    } catch (error) {
      next(error)
    }
};

module.exports = { signUp, signIn };
