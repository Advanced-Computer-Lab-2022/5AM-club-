const Joi = require("joi");
const { Course } = require("../models/Course");
const Instructor = require("../models/Instructor");
const { convert } = require("../utils/CurrencyConverter");
const setCoursePromotionSchema = Joi.object({
  percentage: Joi.number().min(0).max(100),
  deadline: Joi.date().greater(Date.now()),
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
  userReviews: Joi.array().items(Joi.string()).required(),
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
    await Instructor.findByIdAndUpdate(
      id,
      {
        $push: { courses: createdCourse._id.valueOf() },
      },
      { upsert: true }
    );
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
    ...(req.headers.id &&
      (req.headers.type === "instructor"
        ? { instructor: req.headers.id }
        : { owners: req.headers.id })),
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
  let courses = await Course.find(filter)
    .populate("instructor")
    .populate("userReviews.user");
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
    const course = await Course.findById(id).populate("userReviews.user");
    if (req.headers.country) {
      course.price = await convert(
        course.price,
        "United States",
        req.headers.country
      );
    }
    res.send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

async function updateCourse(req, res) {
  const valid = courseSchema.validate(req.body);
  if (valid.error) {
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

async function updateCourse(req, res) {
  const valid = courseSchema.validate(req.body);
  if (valid.error) {
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
  console.log(req.params);
  const course = await Course.findByIdAndUpdate(
    req.params.courseid,
    { $pull: { subtitles: { _id: req.params.subtitleid } } },
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
  console.log(req.body);
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
  console.log(req.params.sectionid);
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
    console.log(subtitle.sections);
  }
  await course.save();
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
  console.log(req.body, "body");
  await course.save();
  console.log(course.subtitles[0].sections[0].content, "content");
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
  console.log(id);
  console.log(req.body);
  const valid = setCoursePromotionSchema.validate(req.body);
  if (valid.error) {
    console.log(valid.error);
    res.status(400).send("Invalid Promotion");
    return;
  }
  const course = await Course.findByIdAndUpdate(
    id,
    {
      promotion: {
        percentage: req.body.percentage,
        deadline: req.body.deadline,
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
  createCourse,
  findCourseByID,
  setCoursePromotion,
};
