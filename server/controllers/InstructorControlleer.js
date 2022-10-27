const { query } = require("express");
const Course = require("../models/Course");
const Courses = require("../models/Course");
const Instructors = require("../models/Instructor");

const createCourse = async (req, res) => {
  const {
    title,
    price,
    subject,
    summary,
    video_preview,
    instructor,
    subtitles,
  } = req.body;
  const instructors = await Instructors.find();
  const instructorMap = instructors.reduce(
    (inst, acc) => ({ ...acc, [inst.username]: inst.id }),
    {}
  );
  const instructorIds = instructor.map((inst) => instructorMap[inst]);
  console.log(instructorIds);
  const createdCourse = await Courses.create({
    title,
    price,
    subject,
    summary,
    video_preview,
    instructor: instructorIds,
    subtitles,
  });
  for (const id of instructorIds) {
    Instructors.findByIdAndUpdate(id, courses.push(createdCourse._id));
  }
  if (createdCourse) {
    res.status(201).json({
      title: createdCourse.title,
      price: createdCourse.price,
      subject: createdCourse.subject,
      summary: createdCourse.summary,
      video_preview: createdCourse.video_preview,
      instructor: instructorIds,
      subtitles: createdCourse.subtitles,
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
};
const getCourse = async (req, res) => {
  try {
    console.log(req.query.searchitem);
    let filter = {};
    filter.instructor = req.headers.id;
    if (req.query.searchitem) {
      const ids = await Instructors.find(
        { username: { $regex: req.query.searchitem } },
        "id"
      );
      console.log("inst is " + ids);
      filter.$or = [
        { subject: { $regex: req.query.searchitem } },
        { instructor: { $in: ids } },
        { title: { $regex: req.query.searchitem } },
      ];
    }

    res.json(await Courses.find(filter));
  } catch (err) {
    console.log(err);
    res.send("invalid req");
  }
};

module.exports = { createCourse, getCourse };
