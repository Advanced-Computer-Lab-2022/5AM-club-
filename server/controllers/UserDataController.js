require("dotenv").config();
const ObjectId = require("bson-objectid");
const countries = require("../utils/Countries.json");
const Joi = require("joi");
const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const nameChecker = require("../utils/checkNames");
const jwt = require("jsonwebtoken");

const countrySchema = Joi.object({
  country: Joi.string()
    .valid(...Object.keys(countries))
    .required(),
});
const addUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": `"Username" cannot be an empty field`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `"Password" cannot be an empty field`,
  }),
});

async function getUsers(req, res) {
  let User;
  switch (req.headers.type) {
    case "individual":
      User = await Trainee.find({ type: "individual" });
      break;
    case "corporate":
      User = await Trainee.find({ type: "corporate" });
      console.log(User);
      break;
    case "admin":
      User = await Admin.find();
      break;
    case "instructor":
      User = await Instructor.find();
      break;
    default:
      res.status(400).send("Invalid UserType");
      break;
  }
  res.send(User);
}

async function getUser(req, res) {
  if (req.headers.id) {
    const id = req.headers.id;
    let User;

    switch (req.headers.type) {
      case "trainee":
        User = await Trainee.findById(id);
        break;
      case "admin":
        User = await Admin.findById(id);
        break;
      case "instructor":
        User = await Instructor.findById(id);
        break;
      default:
        res.status(400).send("Invalid UserType");
        break;
    }
    res.send(User);
  }
}

async function setCountry(req, res) {
  const valid = countrySchema.validate(req.body);

  if (valid.error) {
    res.status(400).send("Invalid Country");
    return;
  }

  if (req.headers.id) {
    const id = req.headers.id;
    let User;
    console.log(req.headers, req.body);
    switch (req.headers.type) {
      case "trainee":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            country: req.body.country,
          },
          { new: true }
        );
        break;
      case "admin":
        console.log(req.body.country);
        User = await Admin.findByIdAndUpdate(
          id,
          {
            country: req.body.country,
          },
          { new: true }
        );
        break;
      case "instructor":
        User = await Instructor.findByIdAndUpdate(
          id,
          {
            country: req.body.country,
          },
          { new: true }
        );
        break;
      default:
        res.status(400).send("Invalid UserType");
        break;
    }
    res.send(User);
  } else {
    res.status(400).send("Missing Id");
  }
}
async function addAdmin(req, res) {
  const result = addUserSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const newAdmin = new Admin(req.body);

  await newAdmin
    .save()
    .then((response) => {
      res.send("Admin added successfully!");
    })
    .catch((err) => res.status(400).send("username already used "));
}

async function addInstructor(req, res) {
  const result = addUserSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const newInstructor = new Instructor({
    ...req.body,
    email: "",
    country: "United States",
    biography: "",
  });
  await newInstructor
    .save()
    .then((response) => {
      res.send("Instructor added successfully!");
    })
    .catch((err) => res.status(400).send("Username already used"));
}

async function addTrainee(req, res) {
  const result = addUserSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const newCorporateTrainee = new Trainee({
    ...req.body,
    courses: [],
    type: "corporate",
  });
  await newCorporateTrainee
    .save()
    .then((response) => {
      res.send("Trainee added successfully!");
    })
    .catch((err) => res.status(400).send("Username already used"));
}

async function signUp(req, res) {
  const result = addUserSchema.validate(req.body);
  console.log(result.error);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //console.log(req.body.username);
  const foundDup = await nameChecker(req.body.username);
  if (foundDup) {
    console.log("found dupp");
    res.status(401).send("username already used!!");
  } else {
    const newindividualTrainee = new Trainee({
      ...req.body,
      courses: [],
      type: "individual",
    });

    await newindividualTrainee
      .save()
      .then((response) => {
        login(req, res);
        //res.send("Trainee added successfully!");
      })
      .catch((err) => res.status(400).send("Username already used"));
  }
}
const login = async (req, res) => {
  const user = { ...req.body };
  const admins = await Admin.find({
    username: user.username,
    password: user.password,
  });
  const instructors = await Instructor.find({
    username: user.username,
    password: user.password,
  });
  const trainees = await Trainee.find({
    username: user.username,
    password: user.password,
  });
  console.log(admins, instructors, trainees);
  if (!admins.length && !instructors.length && !trainees.length) {
    res.status(401).send("Wrong Username or Password");
  } else {
    if (admins.length !== 0) {
      user.type = "admin";
      user._id = admins[0]._id;
      user.country = admins[0].country;
    }
    if (instructors.length !== 0) {
      user.type = "instructor";
      user._id = instructors[0]._id;
      user.country = instructors[0].country;
    }
    if (trainees.length > 0) {
      console.log(trainees);
      user._id = trainees[0]._id;
      user.country = trainees[0].country;
      user.type = trainees[0].type;
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    //console.log();
    res.json({
      accessToken,
      type: user.type,
      country: user.country,
      id: user._id.valueOf(),
    });
  }
};

async function getCourseInstructor(req, res) {
  res.send(await Instructor.find({ courses: ObjectId(req.query.courseid) }));
}

module.exports = {
  getCourseInstructor,
  setCountry,
  getUser,
  getUsers,
  addAdmin,
  addInstructor,
  addTrainee,
  signUp,
  login,
};
