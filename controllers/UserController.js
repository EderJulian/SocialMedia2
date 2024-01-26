const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
  
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);

      const user = await User.create({
        ...req.body,
        password,
        role: "user",
      });

      res.status(201).send({ message: "User succesfully registered", user });
    } catch (error) {
      console.error(error);
      error.origin = "user";
      next(error);
    }
  },

  
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!user || !isMatch) {
        return res
          .status(400)
          .send({ message: "User/Password are incorrect" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.status(200).send({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  
  async getUserByID(req, res) {
    try {
     
      const user = await User.findOne({ _id: req.params._id });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ user });
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  
  async getUserConnected(req, res) {
    try {
      const user = await User.findOne({ tokens: req.headers.authorization });
      if (!user) {
        return res.status(401).send({ message: "Unauthorized: Invalid token" });
      }
      res
        .status(200)
        .send({ message: "connected users info:", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "cant bring the connected user info",
      });
    }
  },

 

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: "Successfully logged out" });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: "Problem disconnecting",
      });
    }
  },
};
module.exports = UserController;