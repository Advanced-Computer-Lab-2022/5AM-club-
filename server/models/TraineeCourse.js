const mongoose = require("mongoose");
const traineeCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    traineeId: {
      type: mongoose.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
    progress: { type: [Boolean], required: true },
    answers: { type: [[Number]], required: true },
    notes: { type: [Object], required: true },
    lastSection: { type: Number, required: true },
    grades: { type: [Number], required: true },
    purchasingCost: { type: Number, required: true },
    sent: { type: Boolean, required: true, default: "false" },
  },
  { timestamps: true }
);
traineeCourseSchema.virtual("complete").get(function () {
  let result = true;
  this.progress.forEach((element) => {
    if (!element) {
      result = false;
      return;
    }
  });
  return result;
});

traineeCourseSchema.set("toJSON", { getters: true, virtuals: true });

const TraineeCourse = mongoose.model("TraineeCourse", traineeCourseSchema);
module.exports = TraineeCourse;
