const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");

const nameChecker = async (name) => {
    const dupTrainee = await Trainee.findOne({ username: name });
    const dupAdmin = await Admin.findOne({ username: name });
    const dupInstructor = await Instructor.findOne({ username: name });
    if (dupAdmin || dupInstructor || dupTrainee) {
        console.log("already used name", dupAdmin, dupInstructor, dupTrainee);
        return true;
    }
    return false;
};

module.exports = nameChecker;
