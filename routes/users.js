const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication,Admincheck } = require("../middlewares/authentication");

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.get("/id/:_id", authentication, Admincheck, UserController.getUserByID);
router.get("/connected", authentication, UserController.getUserConnected);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
