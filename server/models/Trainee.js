const { number } = require("joi");
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
    default: "",
    type: String,
  },
  lastName: {
    default: "",
    type: String,
  },
  gender: {
    default: "",
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
  walletMoney: { type: Number, default: 0 },
  stripeId: String,
  courses: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
    required: true,
    default: [],
  },
  passwordTimeout: { type: Date, default: Date.now() },
});

const Trainee = mongoose.model("Trainees", traineeSchema);
module.exports = Trainee;
