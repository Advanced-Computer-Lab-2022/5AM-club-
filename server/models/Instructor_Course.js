const mongoose = require("mongoose");

const instructorCourseSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "Instructors",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
});
const Instructor_Course = mongoose.model(
  "Instructors_Courses",
  instructorCourseSchema
);
module.exports = Instructor_Course;
