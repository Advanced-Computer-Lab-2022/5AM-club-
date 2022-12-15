const Joi = require("joi");
const { Course } = require("../models/Course");
const Instructor = require("../models/Instructor");
const TraineeCourse = require("../models/TraineeCourse");
const { convert } = require("../utils/CurrencyConverter");
const objectID = require("objectid");
const setCoursePromotionSchema = Joi.object({
  percentage: Joi.number().min(0).max(100).required(),
  startDate: Joi.date().greater(Date.now()).required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
});

const courseSchema = Joi.object({
  title: Joi.string().required(),
  rating: Joi.number().required().min(0).max(5),
  price: Joi.number().required().min(0),
  subject: Joi.array().items(Joi.string()).required(),
  views: Joi.number().required().min(0),
  preview_video: Joi.string().required(),
  summary: Joi.string().required(),
  instructor: Joi.array().items(Joi.string()).required(),
  userReviews: Joi.array().items(Joi.object()).required(),
  owners: Joi.array().items(Joi.string()).required(),
  subtitles: Joi.array().items(Joi.object()).required(),
}).unknown();
const sectionSchema = Joi.object({
  title: Joi.string().required(),
  minutes: Joi.number().required().min(0),
  description: Joi.string().required(),
  content: Joi.object().required(),
}).unknown();
const subtitleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  sections: Joi.array().items(Joi.object()).required(),
}).unknown();

const createCourse = async (req, res) => {
  let {
    title,
    price,
    subject,
    summary,
    rating,
    views,
    preview_video,
    instructor,
    subtitles,
    subDescriptions,
  } = req.body;

  const courseSubs = subtitles.map((subtitle, idx) => {
    return {
      title: subtitle,
      description: subDescriptions[idx],
    };
  });

  const instructors = await Instructor.find({ username: { $in: instructor } });
  let instructorIds = instructors.map((inst) => inst._id.valueOf());
  instructorIds.push(req.user.id);

  const createdCourse = await Course.create({
    title,
    price,
    subject,
    summary,
    rating,
    views,
    preview_video,
    instructor: instructorIds,
    subtitles: courseSubs,
  });
  for (const id of instructorIds) {
    await Instructor.findByIdAndUpdate(
      id,
      {
        $push: { courses: createdCourse._id.valueOf() },
      },
      { upsert: true }
    );
  }
  if (createdCourse) {
    res.status(200).send(createdCourse);
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
};

const getCourseFilter = async (req) => {
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
    }
  }
  filter = {
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

  return filter;
};

const changePrice = async (req, courses) => {
  if (req.headers.country) {
    for (let course of courses) {
      course.price = await convert(
        course.price,
        "United States",
        req.headers.country
      );
    }
  }
};
const getPopulatedCourses = async (req, res) => {
  console.log("getPopulatedCourses", req);
  const filter = await getCourseFilter(req);
  console.log("filter  ", filter);
  let courses = await Course.find(filter)
    .populate({
      path: "instructor",
      populate: {
        path: "userReviews.user",
      },
    })
    .populate("userReviews.user")
    .populate("owners");
  console.log("courses  ", courses);
  await changePrice(req, courses);
  console.log("courseschangedPrice  ", courses);
  res.json(courses);
};

const getMyPopulatedCourses = async (req, res) => {
  console.log(
    "lmaolmaolmao<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
  );
  console.log("getPopulatedCourses", req);
  let filter = await getCourseFilter(req);
  console.log("filter  ", filter);
  filter = {
    ...filter,
    ...(req.user?.id &&
      (req.headers.type === "instructor"
        ? { instructor: req.user.id }
        : { owners: req.user.id })),
  };
  let courses = await Course.find(filter)
    .populate({
      path: "instructor",
      populate: {
        path: "userReviews.user",
      },
    })
    .populate("userReviews.user")
    .populate("owners");
  console.log("courses  ", courses);
  await changePrice(req, courses);
  console.log("courseschangedPrice  ", courses);
  res.json(courses);
};

const getCourses = async (req, res) => {
  const filter = await getCourseFilter(req);
  let courses = await Course.find(filter);
  await changePrice(req, courses);
  res.json(courses);
};
const getMyCourses = async (req, res) => {
  let filter = await getCourseFilter(req);
  filter = {
    ...filter,
    ...(req.user?.id &&
      (req.headers.type === "instructor"
        ? { instructor: req.user.id }
        : { owners: req.user.id })),
  };
  let courses = await Course.find(filter);
  await changePrice(req, courses);
  res.json(courses);
};

const findPopulatedCourseByID = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id)
      .populate({
        path: "instructor",
        populate: {
          path: "userReviews.user",
        },
      })
      .populate("userReviews.user");
    if (req.headers.country) {
      course.price = await convert(
        course.price,
        "United States",
        req.headers.country
      );
    }
    res.send(course);
  } catch (err) {
    res.status(500).send("Server s Error");
  }
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
    res.status(500).send("Server s Error");
  }
};

async function updateCourse(req, res) {
  console.log("asbdknasmld", req.body);
  if (typeof req.body.instructor[0] === "object") {
    for (let i = 0; i < req.body.instructor.length; i++) {
      req.body.instructor[i] = req.body.instructor[i]._id;
    }
  }
  for (let i = 0; i < req.body.userReviews.length; i++) {
    if (typeof req.body.userReviews[i].user === "object") {
      req.body.userReviews[i].user = req.body.userReviews[i].user._id;
    }
  }
  const valid = courseSchema.validate(req.body);
  if (valid.error) {
    console.log(req.body);
    console.log(valid.error);
    res.status(400).json("Invalid Course Object");
    return;
  }
  const course = await Course.findByIdAndUpdate(req.params.courseid, req.body, {
    new: true,
  });
  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function addSubtitle(req, res) {
  const valid = subtitleSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Subtitle Object");
    return;
  }
  const course = await Course.findByIdAndUpdate(
    req.params.courseid,
    { $push: { subtitles: req.body } },
    {
      new: true,
    }
  );
  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function deleteSubtitle(req, res) {
  const course = await Course.findByIdAndUpdate(
    req.params.courseid,
    { $pull: { subtitles: { _id: req.params.subtitleid } } },
    {
      new: true,
    }
  );
  let sectionIndices = [];
  let k = 0;
  for (let i = 0; i < course.subtitles.length; i++) {
    for (let j = 0; j < course.subtitles[i].sections.length; j++) {
      if (course.subtitles[i]._id == req.params.subtitleid) {
        sectionIndices.push(k);
      }
      k++;
    }
  }

  const traineeCourses = await TraineeCourse.find({ course: course._id });
  for (const traineeCourse of traineeCourses) {
    traineeCourse.progress.splice(sectionIndices[0], sectionIndices.length);
    traineeCourse.answers.splice(sectionIndices[0], sectionIndices.length);
    traineeCourse.notes.splice(sectionIndices[0], sectionIndices.length);
    traineeCourse.grades.splice(sectionIndices[0], sectionIndices.length);
    if (
      traineeCourse.lastSection >= sectionIndices[0] &&
      traineeCourse.lastSection !== 0
    ) {
      traineeCourse.lastSection--;
    }
    await traineeCourse.save();
  }

  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function updateSubtitle(req, res) {
  const valid = subtitleSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Subtitle Object");
    return;
  }
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

  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function addSection(req, res) {
  const valid = sectionSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Section Object");
    return;
  }
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id.valueOf() === req.params.subtitleid)
      subtitle.sections.push(req.body);
  }
  await course.save();

  const traineeCourses = await TraineeCourse.find({ course: course._id });
  for (const traineeCourse of traineeCourses) {
    traineeCourse.progress.push(false);
    traineeCourse.answers.push([]);
    traineeCourse.notes.push({});
    traineeCourse.grades.push(0);

    await traineeCourse.save();
  }

  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function deleteSection(req, res) {
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id.valueOf() === req.params.subtitleid) {
      subtitle.sections.splice(
        subtitle.sections.findIndex(function (section) {
          return section._id.valueOf() === req.params.sectionid;
        }),
        1
      );
    }
  }
  await course.save();

  let sectionIndex = 0;
  let k = 0;
  for (let i = 0; i < course.subtitles.length; i++) {
    for (let j = 0; j < course.subtitles[i].sections.length; j++) {
      if (course.subtitles[i]._id == req.params.subtitleid) {
        if (course.subtitles[i].sections[j]._id == req.params.sectionid) {
          sectionIndex = k;
        }
      }
      k++;
    }
  }

  const traineeCourses = await TraineeCourse.find({ course: course._id });
  for (const traineeCourse of traineeCourses) {
    traineeCourse.progress.splice(sectionIndex, 1);
    traineeCourse.answers.splice(sectionIndex, 1);
    traineeCourse.notes.splice(sectionIndex, 1);
    traineeCourse.grades.splice(sectionIndex, 1);
    if (
      sectionIndex <= traineeCourse.lastSection &&
      traineeCourse.lastSection !== 0
    )
      traineeCourse.lastSection--;
    await traineeCourse.save();
  }

  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

async function updateSection(req, res) {
  const valid = sectionSchema.validate(req.body);

  if (valid.error) {
    res.status(400).send("Invalid Section Object");
    return;
  }
  const course = await Course.findById(req.params.courseid);
  for (let subtitle of course.subtitles) {
    if (subtitle._id.valueOf() === req.params.subtitleid) {
      for (let section of subtitle.sections) {
        if (section._id.valueOf() === req.params.sectionid) {
          section.title = req.body.title;
          section.description = req.body.description;
          section.minutes = req.body.minutes;
          section.content = req.body.content;
        }
      }
    }
  }

  await course.save();
  let sectionIndex = 0;
  let k = 0;
  for (let i = 0; i < course.subtitles.length; i++) {
    for (let j = 0; j < course.subtitles[i].sections.length; j++) {
      if (course.subtitles[i]._id == req.params.subtitleid) {
        if (course.subtitles[i].sections[j]._id == req.params.sectionid) {
          sectionIndex = k;
        }
      }
      k++;
    }
  }

  const traineeCourses = await TraineeCourse.find({ course: course._id });
  for (const traineeCourse of traineeCourses) {
    traineeCourse.progress[sectionIndex] = false;
    traineeCourse.answers[sectionIndex] = [];
    traineeCourse.notes[sectionIndex] = {};
    traineeCourse.grades[sectionIndex] = 0;
    await traineeCourse.save();
  }

  if (req.headers.country) {
    course.price = await convert(
      course.price,
      "United States",
      req.headers.country
    );
  }
  res.send(course);
}

const setCoursePromotion = async (req, res) => {
  const id = req.params.id;

  const valid = setCoursePromotionSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Promotion");
    return;
  }

  const course = await Course.findByIdAndUpdate(
    id,
    {
      promotion: {
        percentage: req.body.percentage,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    },
    { new: true }
  );
  res.send("done");
};

module.exports = {
  updateCourse,
  addSubtitle,
  deleteSubtitle,
  updateSubtitle,
  addSection,
  deleteSection,
  updateSection,
  getCourses,
  getMyCourses,
  getPopulatedCourses,
  getMyPopulatedCourses,
  createCourse,
  findCourseByID,
  findPopulatedCourseByID,
  setCoursePromotion,
};
