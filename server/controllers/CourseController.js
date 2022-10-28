const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const { convert } = require("../utils/CurrencyConverter");

const createCourse = async (req, res) => {
  let { title, price, subject, summary, video_preview, instructor, subtitles } =
    req.body;
  //instructor = [...instructor, req.headers.id];
  const instructors = await Instructor.find();
  const instructorMap = instructors.reduce(
    (inst, acc) => ({ ...acc, [inst.username]: inst.id }),
    {}
  );
  let instructorIds = instructor.map((inst) => instructorMap[inst]);
  instructorIds.push(req.headers.id);
  console.log(instructorIds);
  const createdCourse = await Course.create({
    title,
    price,
    subject,
    summary,
    video_preview,
    instructor: instructorIds,
    subtitles,
  });
  for (const id of instructorIds) {
    Instructor.findByIdAndUpdate(id, {
      $push: { courses: createdCourse._id },
      // courses: [...courses, createCourse._id],
    });
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

const getUserCourses = async (req, res) => {
  try {
    console.log(req.query.searchitem);
    let filter = {};
    filter.instructor = req.headers.id;
    if (req.query.searchitem) {
      const ids = await Instructor.find(
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
    filter = {
      ...filter,
      ...(req.query.subject && {
        subject: req.query.subject,
      }),
      ...((standardMax || standardMin) && {
        price: {
          ...(standardMax && { $lte: standardMax }),
          ...(standardMin && { $gte: standardMin }),
        },
      }),
    };
    res.json(await Course.find(filter));
  } catch (err) {
    console.log(err);
    res.send("invalid req");
  }
};

module.exports = {
  getUserCourses,
  createCourse,
};
