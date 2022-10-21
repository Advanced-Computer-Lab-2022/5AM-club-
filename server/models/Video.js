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
  section: {
    type: mongoose.Types.ObjectId,
    ref: "SubtitleSections",
    required: true,
  },
};
const Video = mongoose.model("Videos", videoSchema);
module.exports = Video;
