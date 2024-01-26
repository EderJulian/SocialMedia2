const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {authentication,checkPostAuthorship,} = require("../middlewares/authentication");


router.post("/", authentication, PostController.create);
router.put("/id/:_id", authentication, checkPostAuthorship, PostController.update);
router.delete("/id/:_id", authentication, checkPostAuthorship, PostController.delete);
router.get("/getAll", PostController.getAll);
router.put("/like/:_id", authentication, PostController.like);
router.delete("/unlike/:_id", authentication, PostController.unlike);

module.exports = router;
