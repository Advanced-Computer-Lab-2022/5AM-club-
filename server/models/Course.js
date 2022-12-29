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
  answers: { type: [Number], required: true },
};

const reviewSchema = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Trainee",
    required: true,
  },
  review: { type: String },
  rating: { type: Number },
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
    price: { type: Number, required: true },
    subject: { type: [String], required: true },
    views: { type: Number, required: true },
    preview_video: { type: String, required: true },
    promotion: {
      percentage: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
      type: { type: String },
      default: {},
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
            ref: "Trainee",
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
          ref: "Trainee",
          required: true,
        },
      ],
    },
    pending: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Trainee",
          required: true,
        },
      ],
    },
    rejected: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Trainee",
          required: true,
        },
      ],
    },
    subtitles: { type: [subtitleSchema], required: true },
    published: { type: Boolean, required: true, default: false },
    closed: { type: Boolean, required: true, default: false },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

courseSchema.virtual("valid").get(function () {
  flag = true;
  if (this.subtitles.length == 0) flag = false;
  for (subtitle of this.subtitles) {
    if (subtitle.sections.length == 0) {
      flag = false;
      break;
    }
    for (section of subtitle.sections) {
      if (
        section.content.exercise &&
        section.content.exercise.questions.length == 0
      ) {
        flag = false;
        break;
      }
    }
  }
  return flag;
});

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

courseSchema.virtual("courseRating").get(function () {
  if (this.userReviews.length == 0) return -1;
  let rating = 0;
  this.userReviews.forEach((element) => {
    rating += element.rating;
  });
  rating = (rating / this.userReviews.length).toPrecision(2);
  return rating;
});
courseSchema.set("toJSON", { getters: true, virtuals: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Course,
  reviewSchema,
};
