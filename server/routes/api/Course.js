const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const { checkID } = require("../../middleware/Validation");
router.get("/my-courses", checkID, CourseController.getCourses);
router.get("/", CourseController.getCourses);
router.get("/:id", CourseController.findCourseByID);
router.post("/create-course", CourseController.createCourse);

module.exports = router;
