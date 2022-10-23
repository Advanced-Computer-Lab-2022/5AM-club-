const express = require("express");
const router = express.Router();
const InstructorCourse = require("../../controllers/CourseController");

router.get("/", InstructorCourse.getAllCourses);
router.get("/viewcourses/:userType", InstructorCourse.getUserCourses);
router.get("/viewcourses/:userType/filter", InstructorCourse.filterCourses);

module.exports = router;
