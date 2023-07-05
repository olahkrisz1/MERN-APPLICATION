const express = require("express");
const router = express.Router();
const Question = require("../models/questionsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add new question

router.post("/add-question", authMiddleware, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.send({
      message: "Question added successfully",
      data: newQuestion,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all questions

router.get("/get-all-questions", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user")
      .sort({ createdAt: -1 });
    res.send({
      message: "Questions fetched successfully",
      data: questions,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get question by id

router.get("/get-question-by-id/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user");
    res.send({
      message: "Question fetched successfully",
      data: question,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// update blog

router.put("/update-question/:id", authMiddleware, async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      message: "Question updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// delete question

router.delete("/delete-question/:id", authMiddleware, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.send({
      message: "Question deleted successfully",
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
