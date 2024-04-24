const Post = require("../Models/PostModel");
const { errorHandler } = require("../utils/error");

const create = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You not allowd"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(403, "All required field"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savePost = newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
