
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
require("dotenv").config();


const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, procces.env.JWT_SECRET);

    const user = await User.findOne({ _id: payload._id, tokens: token });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: "Token verification error" });
  }
};

const Admincheck = (req, res, next) => {
  const admins = ["admin", "superadmin"];

  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "Insufficient permissions",
    });
  }

  next();
};

const checkPostAuthorship = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);

    if (!post || post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "You are not the author of this post" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Error verifying post authorship",
    });
  }
};

const checkCommentAuthorship = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params._id);

    if (!comment || comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "You are not the author of this comment" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Error verifying comment authorship",
    });
  }
};

module.exports = { authenticateUser, isAdmin, checkPostAuthorship, checkCommentAuthorship };
