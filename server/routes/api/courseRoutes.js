const {
  createCourse,
  getCourse,
} = require("../../controllers/InstructorControlleer");
const express = require("express");
const router = express.Router();

router.route("/create-course").post(createCourse);
router.route("/my-courses").get(getCourse);

module.exports = router;
