const { x } = require("joi");
const Joi = require("joi");
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const CountryToCurrency = require("country-to-currency");
const Convert = require("easy-currencies");

const schema = Joi.object({
  searchitem: Joi.string(),
  rating: Joi.number().min(0).max(5),
  min: Joi.number().min(0),
  max: Joi.number().min(0),
});

const filterCourses = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);
    const query = JSON.parse(queryStr);
    const result = schema.validate(query);

    if (result.error) {
      res.status(400).send(result);
      return;
    }

    let filter = {};
    if (req.query.min) {
      let standardMin;
      if (req.headers.authorization.country) {
        standardMin = await Convert(req.query.min)
          .from(CountryToCurrency[req.headers.authorization.country])
          .to("USD");
      } else {
        standardMin = req.query.min;
      }
      filter.price = { $gte: standardMin };
    }

    if (req.query.max) {
      let standardMax;
      if (req.headers.authorization.country) {
        standardMax = await Convert(req.query.max)
          .from(CountryToCurrency[req.headers.authorization.country])
          .to("USD");
      }
    } else {
      standardMax = req.query.max;
    }

    if (query.rating) {
      filter.rating = query.rating;
    }

    if (query.searchitem) {
      const ids = await Instructor.find(
        { username: { $regex: query.searchitem } },
        "id"
      );
      query.$or = [
        { subject: { $regex: query.searchitem } },
        { instructor: { $in: ids } },
        { title: { $regex: query.searchitem } },
      ];
    }

    const courses = await Course.find(query);

    res.send(courses);
  } catch (err) {
    res.status(500).send("Server Error");
  }
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
  filterCourses,
  findCourseByID,
};
