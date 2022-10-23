const { x } = require("joi");
const Joi = require("joi");
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const InstructorCourse = require("../models/Instructor_Course");

const numberSchema = Joi.object({
  $gt: Joi.number().min(0),
  $gte: Joi.number().min(0),
  $lt: Joi.number().min(0),
  $lte: Joi.number().min(0),
  $eq: Joi.number().min(0),
});

const schema = Joi.object({
  subject: Joi.string(),

  rating: numberSchema,

  price: numberSchema,

  title: Joi.string(),

  instructor: Joi.string(),
});

const filterCourses = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq)\b/g,
      (comp) => `$${comp}`
    );
    const query = JSON.parse(queryStr);
    console.log(query);
    const result = schema.validate(query);

    if (result.error) {
      res.status(500).send(result);
      return;
    }

    if (query.price) {
      query.price = { $elemMatch: { country: "egypt", price: query.price } };
    }

    if (query.instructor) {
      const ids = await Instructor.find({ username: query.instructor }, "id");

      query.instructor = { $in: ids };
    }
    const courses = await Course.find(query);

    if (Object.keys(courses).length === 0)
      res.send("No thing here go away stupid ");
    else res.send(courses);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const findCourseByID = async (req, res) => {
  const id = req.params.id;
  try {
    Course.findById(id).exec((err, course) => {
      res.send(course);
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  filterCourses,
  findCourseByID,
};
