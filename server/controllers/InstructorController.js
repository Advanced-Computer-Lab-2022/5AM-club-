const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const { convert } = require("../utils/CurrencyConverter");
async function getUserCourses(req, res) {
  let lookupCourses = await Instructor.findById(req.headers.id).select({
    courses: 1,
    _id: 0,
  });

  if (lookupCourses) lookupCourses = lookupCourses.courses;
  else lookupCourses = [];

  let filter = {};

  let standardMin;
  if (req.query.min) {
    if (
      req.headers.authorization &&
      JSON.parse(req.headers.authorization).country
    ) {
      standardMin = await convert(
        req.query.min,
        JSON.parse(req.headers.authorization).country,
        "USD"
      );
    } else {
      standardMin = parseInt(req.query.min);
    }
  }
  let standardMax;
  if (req.query.max) {
    if (
      req.headers.authorization &&
      JSON.parse(req.headers.authorization).country
    ) {
      standardMax = await convert(
        req.query.max,
        JSON.parse(req.headers.authorization).country,
        "USD"
      );
    } else {
      standardMax = parseInt(req.query.max);
    }
  }

  filter._id = { $in: lookupCourses };
  filter = {
    ...filter,
    ...((standardMax || standardMin) && {
      price: {
        ...(standardMax && { $lte: standardMax }),
        ...(standardMin && { $gte: standardMin }),
      },
    }),
  };

  res.send(await Course.find(filter));
}

module.exports = {
  getUserCourses: getUserCourses,
};
