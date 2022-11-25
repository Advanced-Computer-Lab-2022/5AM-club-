const mongoose = require("mongoose");
const { reviewSchema } = require("./Course.js");

const instructorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: { type: String },
  country: { type: String },
  money_owed: { type: Number, default: 0 },
  rating: {
    type: Number,
    default: 0,
  },
  biography: { type: String },
  courses: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
    default: [],
  },
  userReviews: {
    type: [reviewSchema],
    required: true,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
