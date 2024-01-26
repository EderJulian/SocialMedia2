const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const {authentication,checkCommentAuthorship,} = require("../middlewares/authentication");


router.post("/", authentication, CommentController.create);
router.put("/id/:_id",authentication,checkCommentAuthorship , CommentController.update);
router.get("/getAll", authentication, CommentController.getAll);
router.delete("/id/:_id",authentication,checkCommentAuthorshipt,CommentController.delete);

module.exports = router;
