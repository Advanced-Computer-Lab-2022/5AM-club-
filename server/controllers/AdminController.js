const Instructor = require("../models/Instructor");
const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
async function addAdmin(req, res) {
  console.log(req.body);
  const newAdmin = new Admin(req.body);
  if (
    await newAdmin
      .save()
      .catch((err) => res.status(400).send("username already used "))
  )
    res.send("Admin added successfully");
}

async function addInstructor(req, res) {
  const newInstructor = new Instructor(req.body);

  await newInstructor
    .save()
    .then((response) => {
      res.send("Instructor added successfully");
    })
    .catch((err) => res.status(400).send("Username already used"));
}

async function addTrainee(req, res) {
  const newCorporateTrainee = new Trainee(req.body);
  if (
    await newCorporateTrainee
      .save()
      .then()
      .catch((err) => res.status(400).send("Username already used"))
  )
    res.send("Trainee added successfully");
}

module.exports = {
  addAdmin: addAdmin,
  addInstructor: addInstructor,
  addTrainee: addTrainee,
};
