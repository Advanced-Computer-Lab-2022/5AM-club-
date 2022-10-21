const mongoose = require("mongoose");
const videoSchema = {
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  order: { type: Number, required: true },
};
const Video = mongoose.model("Videos", videoSchema);
module.exports = Video;
