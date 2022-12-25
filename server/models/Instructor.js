const { boolean } = require("joi");
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
    required: true,
    default: [],
  },
  userReviews: {
    type: [reviewSchema],
    required: true,
    default: [],
  },
   money_owed: {
        type: [{ year: Number, month: Number, amount: Number }],
        default: [],
    },

  passwordTimeout: { type: Date, default: Date.now() },

    accepted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

instructorSchema.virtual("instructorRating").get(function () {
    if (this.userReviews.length == 0) return -1;
    let rating = 0;
    this.userReviews.forEach((element) => {
        rating += element.rating;
    });
    rating = (rating / this.userReviews.length).toPrecision(2);
    return rating;
});
instructorSchema.set("toJSON", { getters: true, virtuals: true });
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
