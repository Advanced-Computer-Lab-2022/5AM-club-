const Joi = require("joi");
const { Course } = require("../models/Course");
const Instructor = require("../models/Instructor");

const reviewSchema = Joi.object({
  review: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
});

const getMyReviews = async (req, res) => {
  if (req.headers.id) {
    const id = req.headers.id;
    const instructor = await Instructor.findById(id).populate(
      "userReviews.user"
    );
    res.send(instructor.userReviews);
  } else res.status(400).send("Missing ID");
};

const addCourseReview = async (req, res) => {
  const id = req.params.id;
  const valid = reviewSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error);
    return;
  }
  if (req.headers.id) {
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $push: {
          userReviews: {
            user: req.headers.id,
            review: req.body.review,
            rating: req.body.rating,
          },
        },
      },
      {
        new: true,
      }
    );
    res.send("Review added successfully");
  } else {
    res.status(400).send("Missing ID");
  }
};
const editCourseReview = async (req, res) => {
  const courseId = req.params.id;
  console.log(req.headers.id);
  console.log(req.body);
  const valid = reviewSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error);
    return;
  }

  if (req.headers.id) {
    const course = await Course.updateOne(
      {
        _id: courseId,
        userReviews: { $elemMatch: { user: req.headers.id } },
      },
      {
        $set: {
          "userReviews.$.review": req.body.review,
          "userReviews.$.rating": req.body.rating,
        },
      }
    );
    console.log(course);
    res.send("Review edited successfully");
  } else {
    res.status(400).send("Missing ID");
  }
};

const addInstructorReview = async (req, res) => {
  const id = req.params.id;
  const valid = reviewSchema.validate(req.body);
  console.log(req.body);
  if (valid.error) {
    console.log(valid.error);
    res.status(400).send(valid.error);
    return;
  }
  if (req.headers.id) {
    const instructor = await Instructor.findByIdAndUpdate(
      id,
      {
        $push: {
          userReviews: {
            user: req.headers.id,
            review: req.body.review,
            rating: req.body.rating,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send("Review added successfully");
  } else {
    res.status(400).send("Missing ID");
  }
};
const editInstructorReview = async (req, res) => {
  const id = req.params.id;
  const valid = reviewSchema.validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error);
    return;
  }
  if (req.headers.id) {
    const instructor = await Instructor.updateOne(
      { _id: id, userReviews: { $elemMatch: { user: req.headers.id } } },
      {
        $set: {
          "userReviews.$.review": req.body.review,
          "userReviews.$.rating": req.body.rating,
        },
      }
    );
    console.log(instructor);
    res.send("Review edited successfully");
  } else {
    res.status(400).send("Missing ID");
  }
};

const getTraineeReviews = async (req, res) => {
  const id = req.headers.id;
  const courseId = req.params.id;
  const reviews = {};
  const course = await Course.findById(courseId).select({
    userReviews: { $elemMatch: { user: id } },
  });

  const courseInstructors = await Course.findById(courseId).populate(
    "instructor"
  );

  reviews.instructorReview = [];
  let i = 0;
  for (const instructor of courseInstructors.instructor) {
    reviews.instructorReview[i] = instructor.userReviews.find(
      (review) => review.user.toString() === id
    );
    console.log(reviews.instructorReview[i]);
    !reviews.instructorReview[i] && (reviews.instructorReview[i] = {});
    i++;
  }

  reviews.courseReview = course.userReviews ? course.userReviews[0] : {};

  res.send(reviews);
};

module.exports = {
  getMyReviews,
  addInstructorReview,
  editInstructorReview,
  addCourseReview,
  editCourseReview,
  getTraineeReviews,
};
