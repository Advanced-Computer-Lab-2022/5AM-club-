const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const CountryToCurrency = require("country-to-currency");
const Convert = require("easy-currencies");

async function getUserCourses(req, res) {
  let lookupCourses = await Instructor.findById(req.headers.id).select({
    courses: 1,
    _id: 0,
  });

  if (lookupCourses) lookupCourses = lookupCourses.courses;
  else lookupCourses = [];

  let filter = {};

  if (req.query.min) {
    if (req.headers.authorization.country) {
      const standardMin = await Convert(req.query.min)
        .from(CountryToCurrency[req.headers.authorization.country])
        .to("USD");
    } else {
      const standardMin = req.query.min;
    }
    filter.price = { $gte: standardMin };
  }

  if (req.query.max) {
    if (req.headers.authorization.country) {
      const standardMax = await Convert(req.query.max)
        .from(CountryToCurrency[req.headers.authorization.country])
        .to("USD");
    } else {
      const standardMax = req.query.max;
    }

    filter.price = { $lte: standardMax };
  }

  filter._id = { $in: lookupCourses };
  console.log(filter);

  res.send(await Course.find(filter));
}

module.exports = {
  getUserCourses: getUserCourses,
};
