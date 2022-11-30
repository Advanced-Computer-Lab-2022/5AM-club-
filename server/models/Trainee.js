const mongoose = require("mongoose");
const traineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: { type: String },
  country: { type: String },

  creditCardDetails: {
    cardNumber: String,
    cardHolderName: String,
    expiryDateYear: { type: Number, max: 9999 },
    expiryDateMonth: { type: Number, max: 12 },
  },
  courses: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
    required: true,
  },
});

const Trainee = mongoose.model("Trainees", traineeSchema);
module.exports = Trainee;
