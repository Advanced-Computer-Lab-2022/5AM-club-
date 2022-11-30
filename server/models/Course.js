const mongoose = require("mongoose");

const videoSchema = {
  link: {
    type: String,
    required: true,
  },
};

const exerciseSchema = {
  questions: { type: [String], required: true },
  choices: { type: [Object], required: true },
  answers: { type: [String], required: true },
  exerciseType: { type: String, required: true },
};

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
    type: {
      video: { type: videoSchema },
      exercise: { type: exerciseSchema },
    },
  },
});

const subtitleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sections: {
      type: [sectionSchema],
    },
  },
  { toJSON: { virtuals: true } }
);

subtitleSchema.virtual("minutes").get(function () {
  let result = 0;
  for (section of this.sections) {
    result += section.minutes;
  }
  this.minutes = result;
  return result;
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    subject: { type: [String], required: true },
    views: { type: Number, required: true },
    preview_video: { type: String, required: true },
    promotion: {
      percentage: { type: Number },
      deadline: { type: Date },
    },
    summary: {
      type: String,
      required: true,
    },
    instructor: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Instructor" }],
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
    subtitles: { type: [subtitleSchema], required: true },
  },
  { toJSON: { virtuals: true } }
);

courseSchema.virtual("minutes").get(function () {
  let result = 0;
  for (subtitle of this.subtitles) {
    for (section of subtitle.sections) {
      result += section.minutes;
    }
  }
  this.minutes = result;
  return result;
});

const Course = mongoose.model("courses", courseSchema);

module.exports = {
  Course,
};
