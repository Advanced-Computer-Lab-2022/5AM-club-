const mongoose = require("mongoose");

const instructorTraineeSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "Instructors",
    required: true,
  },
  trainee: {
    type: mongoose.Types.ObjectId,
    ref: "Trainees",
    required: true,
  },
  rating: { type: Number },
});
const Instructor_Trainee = mongoose.model(
  "Instructors_Trainees",
  instructorTraineeSchema
);
module.exports = Instructor_Trainee;
