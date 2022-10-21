const mongoose = require("mongoose");

const courseReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Trainees",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const CourseReview = mongoose.model("CourseReviews", courseReviewSchema);
module.exports = CourseReview;
