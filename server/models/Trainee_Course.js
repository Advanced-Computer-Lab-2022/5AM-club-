const mongoose = require("mongoose");

const traineeCourseSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Types.ObjectId,
    ref: "Trainees",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  rating: { type: Number },
});
const Trainee_Course = mongoose.model("Trainees_Courses", traineeCourseSchema);
module.exports = Trainee_Course;
