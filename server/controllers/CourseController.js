const Joi = require("joi");
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

const getCourses = async (req, res) => {
  //validate query string
  let filter = {};
  let searchItem;
  if (req.query.searchitem) {
    const ids = await Instructor.find(
      { username: { $regex: req.query.searchitem, $options: "i" } },
      "id"
    );

    searchItem = {
      $or: [
        { subject: { $regex: req.query.searchitem, $options: "i" } },
        { instructor: { $in: ids } },
        { title: { $regex: req.query.searchitem, $options: "i" } },
      ],
    };
  }
  let standardMin;
  let standardMax;
  if (req.query.min || req.query.max) {
    standardMin = parseInt(req.query.min);
    standardMax = parseInt(req.query.max);
    if (req.headers.country) {
      const country = req.headers.country;
      if (country) {
        if (req.query.min)
          standardMin = await convert(req.query.min, country, "USD");
        if (req.query.max)
          standardMax = await convert(req.query.max, country, "USD");
      }
    }
  }
  filter = {
    ...(req.headers.id && {
      // here remember
      instructor: req.headers.id,
    }),
    ...(req.query.subject && {
      subject: req.query.subject,
    }),
    ...((standardMax || standardMin || standardMax === 0) && {
      price: {
        ...((standardMax || standardMax === 0) && { $lte: standardMax }),
        ...(standardMin && { $gte: standardMin }),
      },
    }),
    ...(searchItem && searchItem),
    ...(req.query.rating && { rating: parseInt(req.query.rating) }),
  };
  console.log(filter);
  res.json(await Course.find(filter));
};
const findCourseByID = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    res.send(course);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getCourses,
  createCourse,
  findCourseByID,
};
