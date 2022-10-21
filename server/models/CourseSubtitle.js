const mongoose = require("mongoose");

const courseSubtitleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});
const CourseSubtitle = mongoose.model("CourseSubtitles", courseSubtitleSchema);
module.exports = CourseSubtitle;
