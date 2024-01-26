const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for your post"],
    },
    content: {
      type: String,
      required: [true, "Please provide content for your post"],
    },
    image: {
      type: String,
    },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        like: Boolean,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
