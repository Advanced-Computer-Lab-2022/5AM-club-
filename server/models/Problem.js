const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    problemType: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
      required: true,
    },
    comments: {
      type: [Object],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
