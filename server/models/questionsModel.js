const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    canShare: {
      type: Boolean,
      required: true,
    },
    canComment: {
      type: Boolean,
      required: true,
    },
    canLike: {
      type: Boolean,
      required: true,
    },
    likesCount: {
      type: Number,
      required: false,
      default: 0,
    },
    commentsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    sharesCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("questions", questionSchema);
