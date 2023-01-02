require("dotenv").config();
const { convert } = require("../utils/CurrencyConverter");
const ObjectId = require("bson-objectid");
const countries = require("../utils/Countries.json");
const Joi = require("joi");
const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Problem = require("../models/Problem");
const Instructor = require("../models/Instructor");
const { Course } = require("../models/Course");
const jwt = require("jsonwebtoken");
const TraineeCourse = require("../models/TraineeCourse");
const nodemailer = require("nodemailer");
const proxy = require("../utils/Proxy.json");
const nameChecker = require("../utils/checkNames");
const emailChecker = require("../utils/EmailChecker");
const { passwordStrength } = require("check-password-strength");
const bcrypt = require("bcryptjs");

const countrySchema = Joi.object({
  country: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.empty": `"Password" cannot be an empty field`,
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
}).unknown();

const addUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": `"Username" cannot be an empty field`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `"Password" cannot be an empty field`,
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  gender: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

const editPersonalInformationSchema = Joi.object({
  email: Joi.string().email().required(),
  biography: Joi.string(),
});

async function getUserType(req, res) {
  let User;

  User = await Trainee.findById(req.headers.id);
  if (User) res.send(User.type);
  else {
    User = await Instructor.findById(req.headers.id);
    if (User) res.send("instructor");
    else {
      return res.status(400).send("Invalid ID");
    }
  }
}

async function getTraineeCourse(req, res) {
  const traineeCourse = await TraineeCourse.findOne({
    traineeId: req.user.id,
    courseId: req.headers.courseid,
  });
  if (traineeCourse) {
    traineeCourse.purchasingCost = await convert(
      traineeCourse.purchasingCost,
      "United States",
      req.headers.country
    );
    res.send(traineeCourse);
  } else res.status(404).send();
}

async function updateTraineeCourse(req, res) {
  const test = await Course.findById(req.body.courseId);

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
      //convert all instructor's wallet money to the country of the user

      break;
    default:
      res.status(400).send("Invalid UserType");
      break;
  }
  res.send(User);
}

async function getUser(req, res) {
  if (req.user.id) {
    let id = req.user.id;
    if (req.headers.id) id = req.headers.id;
    let User;
    switch (req.headers.type) {
      case "corporate":
        User = await Trainee.findById(id);
        User.walletMoney = await convert(
          User.walletMoney,
          "United States",
          req.headers.country
        );
        break;
      case "individual":
        User = await Trainee.findById(id);
        User.walletMoney = await convert(
          User.walletMoney,
          "United States",
          req.headers.country
        );
        break;
      case "admin":
        User = await Admin.findById(id);
        break;
      case "instructor":
        User = await Instructor.findById(id).populate("userReviews.user");
        for (let i = 0; i < User.money_owed.length; i++) {
          User.money_owed[i].amount = await convert(
            User.money_owed[i].amount,
            "United States",
            req.headers.country
          );
        }
        break;
      default:
        res.status(400).send("Invalid UserType");
        break;
    }
    res.send(User);
  }
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
      case "individual":
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
  if (passwordStrength(req.body.password).value !== "Strong") {
    res.status(402).send(passwordStrength(req.body.password).value);
    return;
  }
  const unhashed = req.body.password;
  req.body.password = bcrypt.hashSync(unhashed, 8);
  const newAdmin = new Admin({ ...req.body, country: "United States" });

  await newAdmin
    .save()
    .then((response) => {
      res.send("Admin added successfully!");
    })
    .catch((err) => res.status(400).send("Username already used "));
}

async function addInstructor(req, res) {
  const result = addUserSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  if (passwordStrength(req.body.password).value !== "Strong") {
    res.status(402).send(passwordStrength(req.body.password).value);
    return;
  }
  const unhashed = req.body.password;
  req.body.password = bcrypt.hashSync(unhashed, 8);
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
  if (passwordStrength(req.body.password).value !== "Strong") {
    res.status(402).send(passwordStrength(req.body.password).value);
    return;
  }
  const unhashed = req.body.password;
  req.body.password = bcrypt.hashSync(unhashed, 8);
  const newCorporateTrainee = new Trainee({
    ...req.body,
    courses: [],
    country: "United States",
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
    res.status(406).send(result.error.details[0].message);
    return;
  }

  const foundDup = await nameChecker(req.body.username);

  if (foundDup) {
    res.status(405).send("username already used!");
    return;
  }
  const foundDupEmail = await emailChecker(req.body.email);
  if (foundDupEmail) {
    res.status(411).send("email already used!");
    return;
  }
  if (passwordStrength(req.body.password).value !== "Strong") {
    res.status(402).send(passwordStrength(req.body.password).value);
    return;
  }
  const newindividualTrainee = new Trainee({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 8),
    courses: [],
    country: "United States",
    type: "individual",
  });
  await newindividualTrainee
    .save()
    .then((response) => {
      res.send("Trainee added successfully!");
    })
    .catch((err) => res.status(400).send("Please, enter valid data"));
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

  var hashedPassword = bcrypt.hashSync(pass, 8);
  if (req.user.id) {
    const id = req.user.id;
    let User;
    switch (req.user.type) {
      case "individual":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      case "corporate":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      case "instructor":
        User = await Instructor.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      default:
        res.status(400).send("Invalid UserType");
        return;
        break;
    }
    res.send("Password changed successfully");
    return;
  } else {
    res.status(400).send("Missing Id");
    return;
  }
  res.send("Password changed successfully");
}

async function changeForgottenPassword(req, res) {
  const pass = req.body.password;
  if (passwordStrength(pass).value !== "Strong") {
    res.status(400).send(passwordStrength(pass).value);
    return;
  }

  var hashedPassword = bcrypt.hashSync(pass, 8);
  if (req.headers.id) {
    const id = req.headers.id;
    let User;
    switch (req.headers.type) {
      case "individual":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      case "corporate":
        User = await Trainee.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      case "instructor":
        User = await Instructor.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        break;
      default:
        res.status(400).send("Invalid UserType");
        return;
        break;
    }
    res.send("Password changed successfully");
    return;
  } else {
    res.status(400).send("Missing Id");
    return;
  }
  res.send("Password changed successfully");
}

async function getWalletMoney(req, res) {
  if (req.user.id) {
    const id = req.user.id;

    const User = await Trainee.findById(id);

    res.status(200).json(User.WalletMoney);
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
      subject: "Change Password",
      html:
        '<!doctype html><html lang=/en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Reset Password Email Template</title><meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover {text-decoration: underline !important;}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><!--100% body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: \'Open Sans\', sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"    align="center" cellpadding="0" cellspacing="0">    <tr>        <td style="height:80px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">          <a href="https://rakeshmandal.com" title="logo" target="_blank">                     </a>        </td>    </tr>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td>            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>                <tr>                    <td style="padding:0 35px;">                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:\'Rubik\',sans-serif;">You have                            requested to reset your password</h1>                        <span                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">                            A unique link to reset your                            password has been generated for you. To reset your password, click the                            following link and fill in the new password.                        </p>                        <a href=' +
        proxy.URL +
        "/change-forgotten-password/" +
        user._id +
        ' target="_blank"                            style="background:#96ceaf;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset                            Password</a>                    </td>                </tr>                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>            </table>        </td>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>CANADIAN CHAMBER OF COMMERCE</strong></p>        </td>    </tr>    <tr>        <td style="height:80px;">&nbsp;</td>    </tr></table></td></tr></table><!--/100% body table--></body></html>',
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
          '<!doctype html><html lang=/en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Reset Password Email Template</title><meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover {text-decoration: underline !important;}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><!--100% body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: \'Open Sans\', sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"    align="center" cellpadding="0" cellspacing="0">    <tr>        <td style="height:80px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">          <a href="https://rakeshmandal.com" title="logo" target="_blank">                     </a>        </td>    </tr>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td>            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>                <tr>                    <td style="padding:0 35px;">                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:\'Rubik\',sans-serif;">You have                            requested to reset your password</h1>                        <span                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">                            A unique link to reset your                            password has been generated for you. To reset your password, click the                            following link and fill in the new password.                        </p>                        <a href=' +
          proxy.URL +
          "/change-forgotten-password/" +
          user._id +
          ' target="_blank"                            style="background:#96ceaf;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset                            Password</a>                    </td>                </tr>                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>            </table>        </td>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>CANADIAN CHAMBER OF COMMERCE</strong></p>        </td>    </tr>    <tr>        <td style="height:80px;">&nbsp;</td>    </tr></table></td></tr></table><!--/100% body table--></body></html>',
      });
      res.send("email sent");
      return;
    } else {
      res.status(406).send("email not found");
      return;
    }
  }
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
  var hash = bcrypt.hashSync(req.body.password, process.env.SALT_SECRET);
  console.log(hash);
  const admins = await Admin.findOne({
    username: user.username,
  });
  const instructors = await Instructor.findOne({
    username: user.username,
  });
  const trainees = await Trainee.findOne({
    username: user.username,
  });
  if (!admins && !instructors && !trainees) {
    res.status(401).send("Wrong Username ");
  } else {
    if (admins) {
      if (!bcrypt.compareSync(req.body.password, admins.password))
        return res.status(401).send("Wrong Password");
      user.type = "admin";
      user.username = admins.username;
      user.id = admins._id;
      user.country = admins.country;
      user.email = admins.email;
    }
    if (instructors) {
      if (!bcrypt.compareSync(req.body.password, instructors.password))
        return res.status(401).send("Wrong Password");
      user.type = "instructor";
      user.id = instructors._id;
      user.username = instructors.username;
      user.country = instructors.country;
      user.email = instructors.email;
    }
    if (trainees) {
      if (!bcrypt.compareSync(req.body.password, trainees.password))
        return res.status(401).send("Wrong Password");
      user.type = trainees.type;
      user.id = trainees._id;
      user.username = trainees.username;
      user.country = trainees.country;
      user.email = trainees.email;
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
      username: user.username,
      country: user.country,
    });
  }
};

const updateProfile = async (req, res) => {
  const id = req.user.id;
  const type = req.user.type;
  if (passwordStrength(req.body.password).value !== "Strong") {
    res.status(402).send(passwordStrength(req.body.password).value);
    return;
  }
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  let user;

  const result = updateUserSchema.validate(req.body);
  if (result.error) {
    res.status(406).send(result.error.details[0].message);
    return;
  }

  const foundDupEmail = await emailChecker(req.body.email);
  if (foundDupEmail) {
    res.status(411).send("email already used!");
    return;
  }

  switch (type) {
    case "corporate":
      user = await Trainee.findByIdAndUpdate(
        id,

        req.body,

        { new: true }
      );
      break;
    case "instructor":
      user = await Instructor.findByIdAndUpdate(
        id,

        req.body,

        { new: true }
      );
      break;
    default:
      res.status(400).send("Invalid UserType");
      return;
  }

  req.user.email = user.email;
  const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET);

  res.cookie("jwt", `${refreshToken}`);
  res.cookie("accessToken", `${accessToken}`);
  res.send(user);
};

const checkCompleteProfile = async (req, res) => {
  if (!req.user) res.json("true");
  else if (!req.user.email) res.json("false");
  else res.json("true");
};

const logout = async (req, res) => {
  console.log("logging out!!");
  res.clearCookie("accessToken");
  res.clearCookie("jwt");
};

const addBoughtCourse = async (req, res) => {
  await jwt.verify(
    req.body.token,
    process.env.BUY_COURSE_SECRET,
    async (err, decoded) => {
      if (err) {
        // Wrong or expired refresh token
        return res.status(401).json({ message: "Wrong course token" });
      } else {
        //logic here
        const { courseId, traineeId, paidFromWallet } = decoded;
        const traineeAfterAdd = await Trainee.findOneAndUpdate(
          { _id: traineeId },
          {
            $push: { courses: courseId },
            $inc: { walletMoney: -1 * paidFromWallet },
          }
        );

        let courseAfterAdd, sectionsNum;
        await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { owners: traineeId } }
        ).then((result) => {
          courseAfterAdd = result;
          sectionsNum = courseAfterAdd.subtitles.reduce(
            (Acc, curSubtitle) => Acc + curSubtitle.sections.length,
            0
          );
        });

        const progressArray = new Array(sectionsNum).fill(false);

        await TraineeCourse.create({
          courseId,
          traineeId,
          progress: progressArray,
          answers: Array(sectionsNum).fill(Array(4).fill(-1)),
          notes: Array(sectionsNum).fill([]),
          lastSection: 0,
          grades: Array(sectionsNum).fill(0),
          purchasingCost: courseAfterAdd.price,
        });

        //dont forget instructors
        const moneyPerInst =
          courseAfterAdd.price / courseAfterAdd.instructor.length;
        for (let instId of courseAfterAdd.instructor) {
          const tmpInst = await Instructor.findById(instId);
          const now = new Date();
          if (
            tmpInst.money_owed.slice(-1)[0]?.year == now.getFullYear() &&
            tmpInst.money_owed.slice(-1)[0]?.month == now.getMonth() + 1
          ) {
            tmpInst.money_owed.at(-1).amount += moneyPerInst;
            await Instructor.findByIdAndUpdate(instId, {
              $set: { money_owed: tmpInst.money_owed },
            });
          } else {
            await Instructor.findByIdAndUpdate(instId, {
              $push: {
                money_owed: {
                  year: now.getFullYear(),
                  month: now.getMonth() + 1,
                  amount: moneyPerInst,
                },
              },
            });
          }

          res.json({ message: "boaught succ" });
        }
      }
    }
  );
};

async function reportProblem(req, res) {
  const newProblem = new Problem({
    ...req.body,
    username: req.user.username,
    userId: req.user.id,
  });
  await newProblem.save().then((response) => {
    res.send("Problem reported successfully!");
  });
}
async function viewProblems(req, res) {
  const problems = await Problem.find({ userId: req.user.id });
  res.send(problems);
  //req.user.id get id of the user, filter problems where user id in problem model == user id
}
async function followUp(req, res) {
  await Problem.findByIdAndUpdate(
    req.headers.id,
    { $push: { comments: req.body } },
    { upsert: true }
  );
  res.send("comment added successfully");
}
const refund = async (req, res) => {
  const traineeId = req.user.id;
  const courseId = req.body.courseId;
  console.log("body:", req.body);
  console.log(traineeId, courseId, "Look here please please");
  await TraineeCourse.findOneAndDelete({
    courseId: courseId,
    traineeId: traineeId,
  })
    .then(async (DeletedTraineeCourse) => {
      console.log("deleted from TraineeCourse", DeletedTraineeCourse);
      await Trainee.findOneAndUpdate(
        { _id: traineeId },
        {
          $pull: { courses: courseId },
          $inc: { walletMoney: DeletedTraineeCourse.purchasingCost },
        },
        { new: true }
      )
        .then(async (traineeAfterRemove) => {
          console.log("trainee lost the course", traineeAfterRemove);

          await Course.findOneAndUpdate(
            { _id: courseId },
            { $pull: { owners: traineeId } },
            { new: true }
          )
            .then(async (lostCourse) => {
              console.log("course lost an owner", lostCourse);
              const instId = lostCourse.instructor[0];
              await Instructor.findById(instId).then(async (tmpInst) => {
                console.log(
                  "tmpInst just in",
                  tmpInst,
                  DeletedTraineeCourse.createdAt.getFullYear(),
                  DeletedTraineeCourse.createdAt.getMonth()
                );
                tmpInst.money_owed.forEach(async (element) => {
                  console.log("deletedTC", DeletedTraineeCourse);
                  if (
                    element.year ==
                      DeletedTraineeCourse.createdAt.getFullYear() &&
                    element.month ==
                      DeletedTraineeCourse.createdAt.getMonth() + 1
                  )
                    element.amount -= DeletedTraineeCourse.purchasingCost;
                });
                console.log("money_owed new=", tmpInst.money_owed);
                await Instructor.findOneAndUpdate(
                  { _id: instId },
                  {
                    $set: {
                      money_owed: tmpInst.money_owed,
                    },
                  }
                );
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  res.json({ message: "refunded succ" });
};

async function setProblemStatus(req, res) {
  await Problem.findByIdAndUpdate(req.headers.id, {
    status: req.body.status,
  });
  const problems = await Problem.find();
  res.send(problems);
}

async function sendCertificate(req, res) {
  const { courseId } = req.body;
  const traineeId = req.user.id;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "5AMClubACL@gmail.com",
      pass: "rxfhkqvgqpdfwmmk",
    },
  });
  let user = await Trainee.findById(traineeId);
  let course = await Course.findById(courseId);
  await transporter.sendMail({
    from: "5AMClubACL@gmail.com",
    to: user.email,
    subject: "Congratulations!",
    html:
      '<!doctype html><html lang=/en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Congratulations</title><meta name="description" content="Congratulations."><style type="text/css">a:hover {text-decoration: underline !important;}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><!--100% body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: \'Open Sans\', sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"    align="center" cellpadding="0" cellspacing="0">    <tr>        <td style="height:80px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">          <a href="https://rakeshmandal.com" title="logo" target="_blank">                     </a>        </td>    </tr>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td>            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>                <tr>                    <td style="padding:0 35px;">                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:\'Rubik\',sans-serif;">Congratulations on completing the course ' +
      course.title +
      '</h1>                        <span                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">                            Thank you for using our platform. We hope that this is just the beginning and that you will continue learning on our platform. A certificate has been attached for your efforts. Happy learning!                                            </p>                                          </td>                </tr>                <tr>                    <td style="height:40px;">&nbsp;</td>                </tr>            </table>        </td>    <tr>        <td style="height:20px;">&nbsp;</td>    </tr>    <tr>        <td style="text-align:center;">            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>CANADIAN CHAMBER OF COMMERCE</strong></p>        </td>    </tr>    <tr>        <td style="height:80px;">&nbsp;</td>    </tr></table></td></tr></table><!--/100% body table--></body></html>',
    attachments: [
      {
        filename: "Certificate.pdf",
        path: "./build/Certificate.pdf",
        contentType: "application/pdf",
      },
    ],
  });
  await TraineeCourse.findOneAndUpdate({ courseId, traineeId }, { sent: true });

  res.send("email sent");
  return;
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
  logout,
  addBoughtCourse,
  getWalletMoney,
  editBiographyInstructor,
  editEmailInstructor,
  getTraineeCourse,
  updateTraineeCourse,
  changePassword,
  changeForgottenPassword,
  changePasswordEmail,
  viewContract,
  acceptContract,
  getUserType,
  updateProfile,
  checkCompleteProfile,
  reportProblem,
  viewProblems,
  setProblemStatus,
  followUp,
  sendCertificate,
  refund,
};
