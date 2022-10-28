const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const { checkID } = require("../../middleware/Validation");
router.get("/my-courses", checkID, CourseController.getUserCourses);
router.post("/create-course", CourseController.createCourse);

module.exports = router;
