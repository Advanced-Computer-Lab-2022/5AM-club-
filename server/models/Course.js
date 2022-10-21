const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  minutes: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Map, required: true },
  subject: { type: [String], required: true }, // predefined or usedefined ?
  preview_video: { type: String },
  outline: { type: String },
  views: { type: Number, default: 0 },
  promotion: {
    percentage: { type: Number },
    deadline: { type: Date },
  },
});

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;
