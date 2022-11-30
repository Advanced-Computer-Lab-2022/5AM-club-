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

instructorSchema.virtual("instructorRating").get(function () {
  let rating = 0;
  this.userReviews.forEach((element) => {
    rating += element.rating;
  });
  rating = (rating / this.userReviews.length).toPrecision(2);
  console.log("done");
  return rating;
});
instructorSchema.set("toJSON", { getters: true, virtuals: true });
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
