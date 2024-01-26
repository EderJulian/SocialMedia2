const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {

  async create(req, res, next) {

    try {
      
      const post = await Post.create({ ...req.body, userId: req.user._id });

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { publishedPostsIds: post._id } },
        { new: true }

      );

      res.status(200).send(post);
    } catch (error) {
      console.error(error);
      error.origin = "user";
      next(error);
    }

  },

  async update(req, res) {

    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      res.status(200).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "problems updating the post." });
    }

  },

  async getAll(req, res) {

    try {
      const { page = 1, limit = 10, title, _id } = req.query;

      const searchConditions = {};
      if (title) {
        searchConditions.title = { $regex: new RegExp(title, "i") };
      }
      if (_id) {
        searchConditions._id = { $regex: new RegExp(_id, "i") };
      }

      const posts = await Post.find({ ...searchConditions })
        .populate("likes.userId")
        .limit(limit)
        .skip((page - 1) * limit);

      res.send({ message: "all posts located here", posts });
    } catch (error) {
      console.error(error);
    }

  },

  async like(req, res) {
    try {
      const post = await Post.findOne({
        _id: req.params._id,
        "likes.like": true,
        "likes.userId": req.user._id,
      });
      if (post) {
        return res
          .status(400)
          .send({ message: "Post already liked" });
      }
      const updatedPost = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: { like: true, userId: req.user._id } } },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).send({ message: "Post not found" });
      }
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likedPosts: req.params._id } },
        { new: true }
      );

      res.status(200).send({ message: "post liked", updatedPost });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Cant like the post" });
    }

  },

  async unlike(req, res) {

    try {
      const post = await Post.findOne({
        _id: req.params._id,
        "likes.like": true,
        "likes.userId": req.user._id,
      });

      if (!post) {
        return res.status(400).send({
          message:
            "Like first in order to unlike",
        });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: { userId: req.user._id } } },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).send({ message: "Post not found" });
      }

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likedPosts: req.params._id } },
        { new: true }
      );
      res
        .status(200)
        .send({ message: "Unliked done", updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "removing your like from the post was not possible",
      });
      
    }

  },

  async delete(req, res) {

    try {
      const post = await Post.findByIdAndDelete(req.params._id, { new: true });
      res
        .status(200)
        .send({ message: "You have succesfully deleted the post", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Post couldnt be removed" });
    }

  },

};

module.exports = PostController;