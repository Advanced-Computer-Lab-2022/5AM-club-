const Trainee = require("../models/Trainee");
const Instructor = require("../models/Instructor");

const emailChecker = async (email) => {
  const dupTrainee = await Trainee.findOne({ email });
  const dupInstructor = await Instructor.findOne({ email });
  if (dupInstructor || dupTrainee) {
    console.log("already used email", dupInstructor, dupTrainee);
    return true;
  }
  return false;
};

module.exports = emailChecker;
