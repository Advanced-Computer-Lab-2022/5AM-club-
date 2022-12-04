require("dotenv").config();
const ObjectId = require("bson-objectid");
const countries = require("../utils/Countries.json");
const Joi = require("joi");
const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const { Course } = require("../models/Course");
const jwt = require("jsonwebtoken");
const TraineeCourse = require("../models/TraineeCourse");

const { passwordStrength } = require("check-password-strength");
const nodemailer = require("nodemailer");
const Contract = require("../models/Contract");
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

const editPersonalInformationSchema = Joi.object({
  email: Joi.string().email().required(),
  biography: Joi.string(),
});

async function getTraineeCourse(req, res) {
  res.send(
    await TraineeCourse.findOne({
      traineeId: req.headers.traineeid,
      courseId: req.headers.courseid,
    })
  );
}

async function updateTraineeCourse(req, res) {
  const test = await Course.findById(req.body.courseId);
  let noSections = 0;
  for (let subtitle of test.subtitles) {
    noSections += subtitle.sections.length;
  }
  if (noSections !== req.body.progress.length) {
    res.status(409).send();
    return;
  }

  const traineeCourses = await TraineeCourse.findOneAndUpdate(
    {
      traineeId: ObjectId(req.body.traineeId),
      courseId: ObjectId(req.body.courseId),
    },
    {
      progress: req.body.progress,
      answers: req.body.answers,
      notes: req.body.notes,
      lastSection: req.body.lastSection,
      grades: req.body.grades,
    },
    {
      new: true,
    }
  );
  res.send(traineeCourses);
}

async function getUsers(req, res) {
  let User;
  switch (req.headers.type) {
    case "individual":
      User = await Trainee.find({ type: "individual" });
      break;
    case "corporate":
      User = await Trainee.find({ type: "corporate" });
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
      case "corporate":
        User = await Trainee.findById(id);
        break;
      case "individual":
        User = await Trainee.findById(id);
        break;
      case "admin":
        User = await Admin.findById(id);
        break;
      case "instructor":
        User = await Instructor.findById(id).populate("userReviews.user");
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
      case "corporate":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            country: req.body.country,
          },
          { new: true }
        );
        break;
      case "admin":
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

async function editPersonalInformationInstructor(req, res) {
  const valid = editPersonalInformationSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Email");
    return;
  }

  if (req.headers.id) {
    const id = req.headers.id;
    const User = await Instructor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(User);
  } else {
    res.status(400).send("Missing Id");
  }
}

async function signUp(req, res) {
  const result = addUserSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const foundDup = await nameChecker(req.body.username);
  if (foundDup) {
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
      user._id = trainees[0]._id;
      user.country = trainees[0].country;
      user.type = trainees[0].type;
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      accessToken,
      type: user.type,
      country: user.country,
      id: user._id.valueOf(),
    });
  }
};

async function editEmailInstructor(req, res) {
  const valid = editEmailSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Email");
    return;
  }

  if (req.headers.id) {
    const id = req.headers.id;
    const User = await Instructor.findByIdAndUpdate(
      id,
      {
        email: req.body.email,
      },
      { new: true }
    );
    res.send(User);
  } else {
    res.status(400).send("Missing Id");
  }
}

async function editBiographyInstructor(req, res) {
  const valid = editBiographySchema.validate(req.body);

  if (valid.error) {
    res.status(400).send("Invalid Biography");
    return;
  }

  if (req.headers.id) {
    const id = req.headers.id;
    const User = await Instructor.findByIdAndUpdate(
      id,
      {
        biography: req.body.biography,
      },
      { new: true }
    );
    res.send(User);
  } else {
    res.status(400).send("Missing Id");
  }
}
async function changePassword(req, res) {

  const pass= req.body.password;
  if(passwordStrength(pass).value !== "Strong" ){
    res.status(400).send(passwordStrength(pass).value);
    return;
  }
  if (req.headers.id) {
    const id = req.headers.id;
    switch (req.headers.type) {
      case "trainee":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: req.body.password,
          },
          { new: true }
        );
        break;
      case "instructor":
        User = await Instructor.findByIdAndUpdate(
          id,
          {
            password: req.body.password,
          },
          { new: true }
        );
        break;
      default:
        res.status(400).send("Invalid UserType");
        break;
    }
    res.send("Password changed successfully");
  } else {
    res.status(400).send("Missing Id");
  }
}

async function editBiographyInstructor(req, res) {
  const valid = editBiographySchema.validate(req.body);

  if (valid.error) {
    res.status(400).send("Invalid Biography");
    return;
  }

  if (req.headers.id) {
    const id = req.headers.id;
    const User = await Instructor.findByIdAndUpdate(
      id,
      {
        biography: req.body.biography,
      },
      { new: true }
    );
    res.send(User);
  } else {
    res.status(400).send("Missing Id");
  }
}

async function getCourseInstructor(req, res) {
  res.send(await Instructor.find({ courses: ObjectId(req.query.courseid) }));
}

async function changePasswordEmail(req, res) {
  // search for email by type and name
  const email = req.headers.email;
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,

    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let info = await transporter.sendMail({
    from: "mahmoud200040@hotmail.com",
    to: "mahmoud200040@hotmail.com",
    subject: "change password",
    // TODO: CHANGE ID TO TOKEN DECRYPTION
    html:
      "<html><head></head><body><a href=" +
      proxy.URL +
      "/change-password/" +
      req.headers.id +
      ' target="_blank" > change your password </a><p>note this link will expire within 10 minutes </p></body></html>',
  });
  // TODO: CHANGE ID TO TOKEN DECRYPTION
  let id = req.user.id;
  switch (req.user.type) {
    case "trainee":
      await Trainee.findByIdAndUpdate(
        id,
        {
          passwordTimeout: new Date(),
        },
        { new: true }
      );
      break;
    case "instructor":
      await Instructor.findByIdAndUpdate(
        id,
        {
          passwordTimeout: new Date(),
        },
        { new: true }
      );
    case "admin":
      await Admin.findByIdAndUpdate(
        id,
        {
          passwordTimeout: new Date(),
        },
        { new: true }
      );
      break;
    default:
      break;
  }
}

async function viewContract(req, res) {
  const contract = await Contract.findOne();
  res.send(contract.description);
}
async function acceptContract(req, res) {
  let id = req.headers.id;
  await Instructor.findByIdAndUpdate(id, {
    accepted: true,
  });
  res.send("accepted");
}
module.exports = {
  getCourseInstructor,
  setCountry,
  getUser,
  getUsers,
  addAdmin,
  addInstructor,
  addTrainee,
  editPersonalInformationInstructor,
  signUp,
  login,
  editBiographyInstructor,
  editEmailInstructor,
  getTraineeCourse,
  updateTraineeCourse,
  changePassword,
  changePasswordEmail,
  viewContract,
  acceptContract,
};
