const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const authenticateToken = require("../../middleware/authentication");
const { checkID } = require("../../middleware/Validation");

router.get("/my-courses", checkID, CourseController.getCourses);
router.get("/courses", CourseController.getCourses);
router.get("/courses/:id", CourseController.findCourseByID);

router.put(
  "/my-courses/edit-course/:courseid/",
  checkID,
  CourseController.addSubtitle
);
router.put(
  "/my-courses/edit-course/:courseid/:subtitleid",
  checkID,
  CourseController.addSection
);
router.put(
  "/my-courses/edit-course/:courseid/edit-subtitle/:subtitleid/",
  checkID,
  CourseController.updateSubtitle
);
router.put(
  "/my-courses/edit-course/:courseid/:subtitleid/edit-section/:sectionid",
  checkID,
  CourseController.updateSection
);
router.put(
  "/my-courses/edit-course/:courseid/delete-subtitle/:subtitleid/",
  checkID,
  CourseController.deleteSubtitle
);
router.put(
  "/my-courses/edit-course/:courseid/:subtitleid/delete-section/:sectionid",
  checkID,
  CourseController.deleteSection
);

router.post("/create-course", CourseController.createCourse);

module.exports = router;
