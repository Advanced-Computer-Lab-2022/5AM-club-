const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const { checkID } = require("../../middleware/Validation");
router.get("/my-courses", checkID, CourseController.getCourses);
router.get("/courses", CourseController.getCourses);
router.get("/courses/:id", CourseController.findCourseByID);
router.get("/courses/:id/set-promotion", CourseController.setCoursePromotion);
router.post("/create-course", CourseController.createCourse);

module.exports = router;
