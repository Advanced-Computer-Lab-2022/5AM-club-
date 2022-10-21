const mongoose = require("mongoose");
const exerciseSchema = {
  section: {
    type: mongoose.Types.ObjectId,
    ref: "SubtitleSections",
    required: true,
  },
};
const Video = mongoose.model("Videos", videoSchema);
module.exports = Video;
