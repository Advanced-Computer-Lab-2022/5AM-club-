const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");

const nameChecker = async (name) => {
  //console.log("name from checker is", name);
  const dupTrainee = await Trainee.find({ username: name });
  const dupAdmin = await Admin.find({ username: name });
  const dupInstructor = await Instructor.find({ username: name });
  console.log(dupAdmin);
  console.log(dupInstructor);
  console.log(dupTrainee);
  if (dupAdmin || dupInstructor || dupTrainee) {
    return false;
  }
  return true;
};

module.exports = nameChecker;
