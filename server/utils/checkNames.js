const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");

const nameChecker = async (name) => {
  const dupTrainee = await Trainee.find({ username: name });
  const dupAdmin = await Admin.find({ username: name });
  const dupInstructor = await Instructor.find({ username: name });
  if (dupAdmin || dupInstructor || dupTrainee) {
    return false;
  }
  return true;
};

module.exports = nameChecker;
