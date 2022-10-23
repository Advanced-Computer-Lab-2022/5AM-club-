const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  minutes: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  subject: { type: [String], required: true }, // predefined or usedefined ?
  preview_video: { type: String },
  outline: { type: String },
  views: { type: Number, default: 0 },
  promotion: {
    percentage: { type: Number },
    deadline: { type: Date },
  },
  summary: {
    type: String,
    required: true,
  },
  instructor: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Instructors" }],
    required: true,
  },
  userReviews: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "Trainees",
          required: true,
        },
        review: { type: String },
        rating: { type: Number },
      },
    ],
    required: true,
  },
  owners: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Trainees",
        required: true,
      },
    ],
  },
  subtitles: { type: [subtitleSchema] },
});

const subtitleSchema = new mongoose.Schema({
  title: {
    type: String,
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
  sections: {
    type: [sectionSchema],
  },
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
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
  content: {
    type: { video: { type: videoSchema }, exercise: { type: exerciseSchema } },
  },
});

const videoSchema = {
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

const exerciseSchema = {};

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;
