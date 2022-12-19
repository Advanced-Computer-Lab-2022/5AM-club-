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
const nodemailer = require("nodemailer");
const proxy = require("../utils/Proxy.json");
const nameChecker = require("../utils/checkNames");
const { passwordStrength } = require("check-password-strength");

const countrySchema = Joi.object({
  country:
    Joi.string()
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

async function getUserType(req, res) {
  let User;

  User = await Trainee.findById(req.user.id);
  if (User) res.send(User.type);
  else {
    User = await Instructor.findById(req.user.id);
    if (User) res.send("instructor");
    else {
      return res.status(400).send("Invalid ID");
    }
  }
}

async function getTraineeCourse(req, res) {
  res.send(
    await TraineeCourse.findOne({
      traineeId: req.user.id,
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
  console.log(req.user);
  const traineeCourses = await TraineeCourse.findOneAndUpdate(
    {
      traineeId: ObjectId(req.user.id),
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
  console.log(traineeCourses, "<<<<<<<<<<<<< traineeCourses");
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
  if (req.user.id) {
    console.log("started");
    let id = req.user.id;
    console.log(req.headers);
    if (req.headers.id) id = req.headers.id;
    console.log(id);
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

  if (req.user.id) {
    const id = req.user.id;
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

  if (req.user.id) {
    const id = req.user.id;
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
    return res.status(401).send("username already used!!");
  } else {
    console.log("foundDup=", foundDup);
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
      .catch((err) => res.status(400).send("Please, enter valid data"));
  }
}

async function editEmailInstructor(req, res) {
  const valid = editEmailSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Email");
    return;
  }

  if (req.user.id) {
    const id = req.user.id;
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

  if (req.user.id) {
    const id = req.user.id;
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
  const pass = req.body.password;
  if (passwordStrength(pass).value !== "Strong") {
    res.status(400).send(passwordStrength(pass).value);
    return;
  }
  if (req.user.id) {
    const id = req.user.id;
    switch (req.user.type) {
      case "individual":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: req.body.password,
          },
          { new: true }
        );
        break;
      case "corporate":
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

async function getCourseInstructor(req, res) {
  res.send(await Instructor.find({ courses: ObjectId(req.query.courseid) }));
}

async function changePasswordEmail(req, res) {
  // search for email by type and name
  const email = req.headers.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "5AMClubACL@gmail.com",
      pass: "rxfhkqvgqpdfwmmk",
    },
  });

  let user = await Trainee.findOne({ email: email });
  if (user) {
    await Trainee.findByIdAndUpdate(
      user._id,
      {
        passwordTimeout: new Date(),
      },
      { new: true }
    );

    await transporter.sendMail({
      from: "5AMClubACL@gmail.com",
      to: email,
      subject: "change password",
      html:
        "<html><head></head><body><a href=" +
        proxy.URL +
        "/change-forgotten-password/" +
        user._id +
        ' target="_blank" > change your password </a><p>note this link will expire within 10 minutes </p></body></html>',
    });
    res.send("email sent");
    return;
  } else {
    user = await Instructor.findOne({ email: email });
    if (user) {
      await Instructor.findByIdAndUpdate(
        user._id,
        {
          passwordTimeout: new Date(),
        },
        { new: true }
      );

      await transporter.sendMail({
        from: "5AMClubACL@gmail.com",
        to: email,
        subject: "change password",
        html:
          "<html><head></head><body><a href=" +
          proxy.URL +
          "/change-forgotten-password/" +
          user._id +
          ' target="_blank" > change your password </a><p>note this link will expire within 10 minutes </p></body></html>',
      });
      res.send("email sent");
      return;
    }
  }

  res.send("Invalid user data");
}

async function viewContract(req, res) {
  const contract = await Contract.findOne();
  res.send(contract.description);
}
async function acceptContract(req, res) {
  let id = req.user.id;
  await Instructor.findByIdAndUpdate(id, {
    accepted: true,
  });
  res.send("accepted");
}

const decodeToken = async (req, res) => {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(401);
    else return res.json(user);
  });
};

const login = async (req, res) => {
  const user = { username: req.body.username };
  const admins = await Admin.findOne({
    username: user.username,
    password: req.body.password,
  });
  const instructors = await Instructor.findOne({
    username: user.username,
    password: req.body.password,
  });
  const trainees = await Trainee.findOne({
    username: user.username,
    password: req.body.password,
  });
  //console.log(admins, instructors, trainees);
  if (!admins && !instructors && !trainees) {
    res.status(401).send("Wrong Username or Password");
  } else {
    if (admins) {
      user.type = "admin";
      user.id = admins._id;
      user.country = admins.country;
    }
    if (instructors) {
      user.type = "instructor";
      user.id = instructors._id;
      user.country = instructors.country;
    }
    if (trainees) {
      user.type = trainees.type;
      user.id = trainees._id;
      user.country = trainees.country;
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "120m",
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    //console.log(refreshToken);

    res.cookie("jwt", `${refreshToken}`);
    res.cookie("accessToken", `${accessToken}`);

    //refreshTokens.push(refreshToken);

    // console.log(res.cookie);
    res.json({
      type: user.type,
      country: user.country,
      username: user.username,
    });
  }
};

const logout = async (req, res) => {
  console.log("logging out!!");
  res.clearCookie("accessToken");
  res.clearCookie("jwt");
};

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
  logout,
  editBiographyInstructor,
  editEmailInstructor,
  getTraineeCourse,
  updateTraineeCourse,
  changePassword,
  changePasswordEmail,
  viewContract,
  acceptContract,
  getUserType,
};
