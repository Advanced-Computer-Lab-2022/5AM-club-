const Instructor_Course = require("../models/Instructor_Course");
const Trainee_Course = require("../models/Trainee_Course");
const Course = require("../models/Course");

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
  let lookupCourses;
  if (req.params.userType === "trainee") {
    lookupCourses = await Trainee_Course.find({
      trainee: req.query.ID,
    });
  } else if (req.params.userType === "instructor") {
    lookupCourses = await Instructor_Course.find({
      instructor: req.query.ID,
    });
  } else {
    res.status(400).send("Invalid user type");
    return;
  }
  for (let c of lookupCourses) {
    const course = await Course.findById(c.course.valueOf());
    courses.push(course);
  }
  res.send(courses);
}

async function getAllCourses(req, res) {
  res.send(await Course.find());
}

async function filterCourses(req, res) {
  if (req.params.userType === "trainee") {
  } else if (req.params.userType === "instructor") {
    if (req.query.ID === undefined) {
      res.status(400).send("No ID was given");
      return;
    }
    if (!req.query.ID.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).send("Invalid ID");
      return;
    }
    if (
      !(
        req.query.filter === "subject" ||
        req.query.filter === "price" ||
        req.query.filter === "subject-price"
      )
    ) {
      res.status(400).send("Invalid filter");
      return;
    }
    let courses = [];
    const lookupCourses = await Instructor_Course.find({
      instructor: req.query.ID,
    });
    for (let c of lookupCourses) {
      const course = await Course.findById(c.course.valueOf());
      courses.push(course);
    }

    console.log(courses);
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
  } else {
    res.status(400).send("Invalid user type");
    return;
  }
}
module.exports = {
  getUserCourses: getUserCourses,
  getAllCourses: getAllCourses,
  filterCourses: filterCourses,
};
