const countries = require("../utils/Countries.json");
const Joi = require("joi");
const Trainee = require("../models/Trainee");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const countrySchema = Joi.object({
  country: Joi.string()
    .valid(
      ...countries.values.map((e) => {
        return e.name;
      })
    )
    .required(),
});

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
module.exports = { setCountry, getUser };
