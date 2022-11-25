const Joi = require("joi");
const { Course } = require("../models/Course");
const Instructor = require("../models/Instructor");
const { convert } = require("../utils/CurrencyConverter");
const createCourse = async (req, res) => {
  console.log(req.body);

  let {
    title,
    price,
    subject,
    summary,
    video_preview,
    instructor,
    subtitles,
    subDescriptions,
  } = req.body;

  let i = 0;
  const courseSubs = subtitles.map((subtitle, idx) => {
    return {
      title: subtitle,
      description: subDescriptions[idx],
    };
  });

  const instructors = await Instructor.find({ username: { $in: instructor } });
  let instructorIds = instructors.map((inst) => inst._id.valueOf());
  instructorIds.push(req.headers.id);

  const createdCourse = await Course.create({
    title,
    price,
    subject,
    summary,
    video_preview,
    instructor: instructorIds,
    subtitles: courseSubs,
  });
  for (const id of instructorIds) {
    Instructor.findByIdAndUpdate(id, {
      $push: { courses: createdCourse._id },
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
  let filter = {};
  let searchItem;
  if (req.query.searchItem) {
    const ids = await Instructor.find(
      { username: { $regex: req.query.searchItem, $options: "i" } },
      "id"
    );

    searchItem = {
      $or: [
        { subject: { $regex: req.query.searchItem, $options: "i" } },
        { instructor: { $in: ids } },
        { title: { $regex: req.query.searchItem, $options: "i" } },
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
          standardMin = await convert(req.query.min, country, "United States");
        if (req.query.max)
          standardMax = await convert(req.query.max, country, "United States");
      }
      console.log(standardMin);
    }
  }
  filter = {
    ...(req.headers.id && {
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
  let courses = await Course.find(filter);
  if (req.headers.country) {
    for (let course of courses) {
      course.price = await convert(
        course.price,
        "United States",
        req.headers.country
      );
    }
  }
  console.log(filter);
  res.json(courses);
};
const findCourseByID = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    if (req.headers.country) {
      course.price = await convert(
        course.price,
        "United States",
        req.headers.country
      );
    }
    res.send(course);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

async function addSubtitle(req, res) {
  //TODO: Joi Validation
  const course = await Course.findByIdAndUpdate(
    req.params.courseid,
    { $push: { subtitles: req.body } },
    {
      new: true,
    }
  );
  res.send(course);
}

async function deleteSubtitle(req, res) {
  const course = await Course.findByIdAndUpdate(
    req.params.courseid,
    { $pull: { subtitles: [{ _id: req.params.subtitleid }] } },
    {
      new: true,
    }
  );
  res.send(course);
}

async function updateSubtitle(req, res) {
  //TODO: Joi Validation
  const course = await Course.findOneAndUpdate(
    {
      _id: req.params.courseid,
      subtitles: { $elemMatch: { _id: req.params.subtitleid } },
    },
    { $set: { "subtitles.$": req.body } },
    {
      new: true,
    }
  );
  res.send(course);
}

async function addSection(req, res) {
  //TODO: Joi Validation
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id === req.params.subtitleid) subtitle.push(req.body);
  }
  await course.save();
  res.send(course);
}

async function deleteSection(req, res) {
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id === req.subtitleid) {
      subtitle.filter((section) => section._id !== req.params.sectionid);
    }
  }
  await course.save();
  res.send(course);
}

async function updateSection(req, res) {
  //TODO: Joi Validation
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id === req.params.subtitleid) {
      for (let section of subtitle) {
        if (section._id === req.params.sectionid) section = req.body;
      }
    }
  }
  await course.save();
  res.send(course);
}

module.exports = {
  addSubtitle,
  deleteSubtitle,
  updateSubtitle,
  addSection,
  deleteSection,
  updateSection,
  getCourses,
  createCourse,
  findCourseByID,
};
