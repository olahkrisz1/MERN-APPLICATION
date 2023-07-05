const Like = require("../models/likesModel");
const Share = require("../models/sharesModel");
const Comment = require("../models/commentsModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Question = require("../models/questionsModel");

// like a question

router.post("/like-question", authMiddleware, async (req, res) => {
  try {
    // add new like to likes collection
    const newLike = new Like(req.body);
    await newLike.save();

    // increment likes count in Question document
    await Question.findByIdAndUpdate(req.body.question, {
      $inc: { likesCount: 1 },
    });

    res.send({
      message: "Question liked successfully",
      data: newLike,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// unlike a question

router.post("/unlike-question", authMiddleware, async (req, res) => {
  try {
    // delete like to likes collection
    await Like.findOneAndDelete(req.body);

    // decrement likes count in Question document
    await Question.findByIdAndUpdate(req.body.question, {
      $inc: { likesCount: -1 },
    });

    res.send({
      message: "Question unliked successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all likes of a question
router.get("/get-all-likes-of-question/:id", async (req, res) => {
  try {
    const likes = await Like.find({ blog: req.params.id }).populate("user");
    res.send({
      message: "Likes fetched successfully",
      data: likes,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// add comment
router.post("/add-comment", authMiddleware, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();

    // increment comments count in blog document
    await Question.findByIdAndUpdate(req.body.question, {
      $inc: { commentsCount: 1 },
    });

    res.send({
      message: "Comment added successfully",
      data: newComment,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all comments of a blog
router.get("/get-all-comments-of-question/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ question: req.params.id }).populate(
      "user"
    );
    res.send({
      message: "comments fetched successfully",
      data: comments,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// delete a comment

router.post("/delete-comment", authMiddleware, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.body.commentId);

    // decrement comments count
    await Question.findByIdAndUpdate(req.body.questionId, {
      $inc: { commentsCount: -1 },
    });

    res.send({
      message: "Comment deleted successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
