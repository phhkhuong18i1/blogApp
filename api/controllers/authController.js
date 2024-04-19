const User = require("../Models/UserModel");
const bcrypt = require("bcrypt")
const validator = require("validator")
const signUp = async (req, res) => {
  const { username, email, password } = req.body;


  if (!username || !email || !password)
    return res.status(400).json("All fields are required...");

  if (!validator.isEmail(email))
    return res.status(400).json("Email must be a valid email");

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ message: "Email đã tồn tại" });

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
    return res.status(400).json({ message: error });
  }
};

module.exports = { signUp };
