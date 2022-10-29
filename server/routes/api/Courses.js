const ViewCourses = require("../../controllers/CourseController");
const express = require("express");
const router = express.Router();

router.get("/", ViewCourses);

module.exports = router;
