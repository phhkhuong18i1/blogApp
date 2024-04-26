const Comment = require("../Models/CommentModel");
const { errorHandler } = require("../utils/error");

const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler("Bạn không có quyền truy cập"));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId}).sort({createdAt: -1})
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}

module.exports = { createComment, getComments };
