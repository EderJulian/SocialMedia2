const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {
  authentication,
  isAuthorPost,
} = require("../middlewares/authentication");


router.post("/", authentication, PostController.create);
router.put("/id/:_id", authentication, isAuthorPost, PostController.update);
router.delete("/id/:_id", authentication, isAuthorPost, PostController.delete);
router.get("/getAll", PostController.getAll);
router.put("/like/:_id", authentication, PostController.like);
router.delete("/unlike/:_id", authentication, PostController.unlike);

module.exports = router;
