const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
async function getUserCourses(req, res) {
  if (req.query.ID === undefined) {
    res.status(400).send("No ID was given");
    return;
  }
  if (!req.query.ID.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send("Invalid ID");
    return;
  }
  let courses = [];
  let lookupCourses = await Instructor.findById(req.query.ID).select({
    courses: 1,
    _id: 0,
  });

  if (lookupCourses) lookupCourses = lookupCourses.courses;
  else lookupCourses = [];

  for (let courseReference of lookupCourses) {
    const course = await Course.findById(courseReference.valueOf());
    courses.push(course);
  }
  res.send(courses);
}

async function getAllCourses(req, res) {
  res.send(await Course.find());
}

async function filterCourses(req, res) {
  if (req.query.ID === undefined) {
    res.status(400).send("No ID was given");
    return;
  }
  if (!req.query.ID.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send("Invalid ID");
    return;
  }
  if (!(req.query.filter === "subject" || "price" || "subject-price")) {
    res.status(400).send("Invalid filter");
    return;
  }
  let courses = [];
  let lookupCourses = await Instructor.findById(req.query.ID).select({
    courses: 1,
    _id: 0,
  });

  if (lookupCourses) lookupCourses = lookupCourses.courses;
  else lookupCourses = [];

  for (let courseReference of lookupCourses) {
    const course = await Course.findById(courseReference.valueOf());
    courses.push(course);
  }
  if (req.query.filter === "subject") {
    courses = courses.filter(function (c) {
      return c.subject.includes(req.query.subject);
    });
  } else if (req.query.filter === "price") {
    courses = courses.filter(function (c) {
      return c.price <= req.query.max && c.price >= req.query.min;
    });
  } else {
    courses = courses.filter(function (c) {
      return (
        c.price <= req.query.max &&
        c.price >= req.query.min &&
        c.subject === req.query.subject
      );
    });
  }
  res.send(courses);
}

module.exports = {
  getUserCourses: getUserCourses,
  getAllCourses: getAllCourses,
  filterCourses: filterCourses,
};
