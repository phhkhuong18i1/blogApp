const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    image: { type: String, default: "post.png" },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
