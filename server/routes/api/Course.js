const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const { checkID } = require("../../middleware/Validation");
router.get("/my-courses", checkID, CourseController.getCourses);
router.put(
  "/my-courses/editcourse/:courseid/",
  checkID,
  CourseController.addSubtitle
);
router.put(
  "/my-courses/edit-course/:courseid/:subtitleid",
  checkID,
  CourseController.addSection
);
router.put(
  "/my-courses/edit-course/:courseid/:subtitleid/:sectionid",
  checkID,
  CourseController.updateSection
);

router.get("/courses", CourseController.getCourses);
router.get("/courses/:id", CourseController.findCourseByID);
router.post("/create-course", CourseController.createCourse);

module.exports = router;
