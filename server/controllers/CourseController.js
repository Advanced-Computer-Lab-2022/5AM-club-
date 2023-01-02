const Joi = require("joi");
const Trainee = require("../models/Trainee");

const { Course } = require("../models/Course");
const Instructor = require("../models/Instructor");
const TraineeCourse = require("../models/TraineeCourse");
const Problem = require("../models/Problem");
const { convert } = require("../utils/CurrencyConverter");
const objectID = require("objectid");
const setCoursePromotionSchema = Joi.object({
  percentage: Joi.number().min(0).max(100).required(),
  startDate: Joi.date().greater(Date.now()).required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  type: Joi.string().valid("instructor", "admin").required(),
}).unknown();

const courseSchema = Joi.object({
  title: Joi.string().required(),
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
  } = req.body;

  const instructors = await Instructor.find({
    username: { $in: instructor },
  });
  let instructorIds = instructors.map((inst) => inst._id.valueOf());
  instructorIds.push(req.user.id);
  let createdCourse;
  try {
    createdCourse = await Course.create({
      title,
      price: Math.floor(price + 0.5),
      subject,
      summary,
      rating,
      views,
      preview_video,
      instructor: instructorIds,
    });
  } catch (err) {
    res.status(406).send("error");
    return;
  }
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
        { summary: { $regex: req.query.searchItem, $options: "i" } },
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
      subject: { $in: req.query.subject },
    }),
    ...((standardMax || standardMin || standardMax === 0) && {
      price: {
        ...((standardMax || standardMax === 0) && {
          $lte: standardMax,
        }),
        ...(standardMin && { $gte: standardMin }),
      },
    }),
    ...(searchItem && searchItem),
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
  const filter = await getCourseFilter(req);
  filter.closed = false;
  filter.published = true;
  let courses = await Course.find(filter)
    .populate({
      path: "instructor",
      populate: {
        path: "userReviews.user",
      },
    })
    .populate({
      path: "owners",
    })
    .populate({ path: "pending" })
    .populate({
      path: "rejected",
    })
    .populate("userReviews.user");
  if (req.query.rating) {
    courses = courses.filter((course) => {
      return course.courseRating >= req.query.rating;
    });
  }

  await changePrice(req, courses);
  res.json(courses);
};

const getMyPopulatedCourses = async (req, res) => {
  let filter = await getCourseFilter(req);
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
    .populate({
      path: "owners",
    })
    .populate("userReviews.user");
  if (req.query.rating) {
    courses = courses.filter((course) => {
      return course.courseRating >= req.query.rating;
    });
  }
  await changePrice(req, courses);
  res.json(courses);
};

const getCourses = async (req, res) => {
  const filter = await getCourseFilter(req);
  filter.closed = false;
  filter.published = true;
  let courses = await Course.find(filter);
  if (req.query.rating) {
    courses = courses.filter((course) => {
      return course.courseRating >= req.query.rating;
    });
  }
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
  if (req.query.rating) {
    courses = courses.filter((course) => {
      return course.courseRating >= req.query.rating;
    });
  }
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
      .populate({
        path: "owners",
      })
      .populate({ path: "pending" })
      .populate({
        path: "rejected",
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
    res.status(500).send("Server ssssssss Error");
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
    res.status(500).send("Server sssssss Error");
  }
};

async function updateCourse(req, res) {
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

  const course = await Course.findById(id);
  if (
    course.promotion.type !== "admin" ||
    (course.promotion.type === "admin" && course.promotion.endDate < new Date())
  ) {
    course.promotion = {
      percentage: req.body.percentage,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      type: "instructor",
    };
    await course.save();
    res.send(course);
  } else {
    res.status(407).send("Course already has a promotion set by an admin");
  }
};

const setMultipleCoursesPromotion = async (req, res) => {
  const id = req.params.id;

  const valid = setCoursePromotionSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send("Invalid Promotion");
    return;
  }
  const course = await Course.find({ title: { $in: req.body.courses } });
  for (let i = 0; i < course.length; i++) {
    course[i].promotion = {
      percentage: req.body.percentage,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      type: "admin",
    };
    await course[i].save();
  }
  res.send("done");
};

async function deleteCourse(req, res) {
  const course = await Course.findByIdAndDelete(req.params.id);
  await Instructor.findByIdAndUpdate(req.user.id, {
    $pull: { courses: course._id },
  });

  if (!course) {
    res.status(404).send("Course not found");
    return;
  }
  res.send(course);
}

async function incrementCourseViews(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404).send("Course not found");
    return;
  }
  course.views++;
  await course.save();
  res.send(course);
}

async function getCourseMaxMin(req, res) {
  const courses = await Course.find();
  let max = 0;
  let min = Infinity;
  await changePrice(req, courses);
  for (let course of courses) {
    if (course.price > max) {
      max = course.price;
    }
  }
  for (let course of courses) {
    if (course.price < min) {
      min = course.price;
    }
  }
  res.send({ max: max, min: min === Infinity ? 0 : min });
}

async function getMyCourseMaxMin(req, res) {
  let filter = {
    ...(req.user?.id &&
      (req.headers.type === "instructor"
        ? { instructor: req.user.id }
        : { owners: req.user.id })),
  };
  const courses = await Course.find(filter);
  let max = 0;
  let min = Infinity;
  await changePrice(req, courses);
  for (let course of courses) {
    if (course.price > max) {
      max = course.price;
    }
  }
  for (let course of courses) {
    if (course.price < min) {
      min = course.price;
    }
  }
  res.send({ max: max, min: min === Infinity ? 0 : min });
}

async function getCourseSubjects(req, res) {
  const courses = await Course.find();
  if (!courses) {
    res.send([]);
    return;
  }
  let subjects = [];
  for (let course of courses) {
    for (let i = 0; i < course.subject.length; i++) {
      if (subjects.filter((s) => s?.value === course.subject[i])?.length === 0)
        subjects.push({ label: course.subject[i], value: course.subject[i] });
    }
  }
  // sort array by object value
  subjects.sort((a, b) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) {
      return -1;
    }
    if (a.label.toLowerCase() > b.label.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  res.send(subjects);
}

async function getMyCourseSubjects(req, res) {
  let filter = {
    ...(req.user?.id &&
      (req.headers.type === "instructor"
        ? { instructor: req.user.id }
        : { owners: req.user.id })),
  };
  const courses = await Course.find(filter);
  if (!courses) {
    res.send([]);
    return;
  }
  let subjects = [];
  for (let course of courses) {
    for (let i = 0; i < course.subject.length; i++) {
      if (subjects.filter((s) => s?.value === course.subject[i])?.length === 0)
        subjects.push({ label: course.subject[i], value: course.subject[i] });
    }
  }
  // sort array by object value
  subjects.sort((a, b) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) {
      return -1;
    }
    if (a.label.toLowerCase() > b.label.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  res.send(subjects);
}
const requestCourseAccess = async (req, res) => {
  if (req.user && req.user.type === "corporate") {
    const courseId = req.params.id;
    const traineeId = req.user.id;
    const course = await Course.findByIdAndUpdate(courseId, {
      $push: { pending: traineeId },
    });
    res.send(course);
  } else {
    res.status(401).send("Unauthorized");
  }
};
const getCourseRequests = async (req, res) => {
  if (req.user && req.user.type === "admin") {
    const courses = await Course.find({
      $or: [
        { pending: { $exists: true, $ne: [] } },
        { accepted: { $exists: true, $ne: [] } },
        { rejected: { $exists: true, $ne: [] } },
      ],
    })
      .populate("pending")
      .populate("accepted")
      .populate("rejected");
    const requests = { accepted: [], rejected: [], pending: [] };
    for (let course of courses) {
      for (let accepted of course.accepted) {
        requests.accepted.push({
          course: course.title,
          trainee: accepted.username,
          courseId: course._id,
          traineeId: accepted._id,
        });
      }
      for (let rejected of course.rejected) {
        requests.rejected.push({
          course: course.title,
          trainee: rejected.username,
          courseId: course._id,
          traineeId: rejected._id,
        });
      }
      for (let pending of course.pending) {
        requests.pending.push({
          course: course.title,
          trainee: pending.username,
          courseId: course._id,
          traineeId: pending._id,
        });
      }
    }

    res.send(requests);
  } else {
    res.status(401).send("Unauthorized");
  }
};

const getReports = async (req, res) => {
  if (req.user && req.user.type === "admin") {
    const reports = await Problem.find();
    res.send(reports);
  } else {
    res.status(401).send("Unauthorized");
  }
};

const acceptCourseAccess = async (req, res) => {
  if (req.user && req.user.type === "admin") {
    const courseId = req.params.id;
    const traineeId = req.body.traineeId;
    const course = await Course.findByIdAndUpdate(courseId, {
      $pull: { pending: traineeId },
      $push: { owners: traineeId, accepted: traineeId },
    });
    await Trainee.findOneAndUpdate(
      { _id: traineeId },
      {
        $push: { courses: courseId },
      }
    );
    const sectionsNum = course.subtitles.reduce(
      (Acc, curSubtitle) => Acc + curSubtitle.sections.length,
      0
    );
    const progressArray = new Array(course.sectionsNum).fill(false);

    await TraineeCourse.create({
      courseId,
      traineeId,
      progress: progressArray,
      answers: Array(sectionsNum).fill(Array(4).fill(-1)),
      notes: Array(sectionsNum).fill([]),
      lastSection: 0,
      grades: Array(sectionsNum).fill(0),
      purchasingCost: 0,
    });

    res.send(course);
  } else {
    res.status(401).send("Unauthorized");
  }
};

const rejectCourseAccess = async (req, res) => {
  if (req.user && req.user.type === "admin") {
    const courseId = req.params.id;
    const traineeId = req.body.traineeId;
    const course = await Course.findByIdAndUpdate(courseId, {
      $pull: { pending: traineeId },
      $push: { rejected: traineeId },
    });
    res.send(course);
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  setMultipleCoursesPromotion,
  getCourseSubjects,
  getCourseMaxMin,
  deleteCourse,
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
  incrementCourseViews,
  getMyCourseSubjects,
  getMyCourseMaxMin,
  requestCourseAccess,
  getCourseRequests,
  getReports,
  acceptCourseAccess,
  rejectCourseAccess,
};
