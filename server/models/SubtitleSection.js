const mongoose = require("mongoose");

const subtitleSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: mongoose.Types.ObjectId,
    ref: "CourseSubtitles",
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
const SubtitleSection = mongoose.model(
  "SubtitleSections",
  subtitleSectionSchema
);
module.exports = SubtitleSection;
