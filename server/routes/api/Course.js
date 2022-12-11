const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");
const authenticateToken = require("../../middleware/authentication");

router.get("/my-courses", CourseController.getCourses);
router.get("/courses", CourseController.getCourses);
router.get("/courses/:id/set-promotion", CourseController.setCoursePromotion);
router.get("/courses/:id", CourseController.findCourseByID);

router.put("/my-courses/edit-course/:courseid", CourseController.updateCourse);
router.put(
    "/my-courses/:id/set-promotion",
    CourseController.setCoursePromotion
);
router.put(
    "/my-courses/edit-course/:courseid/add-subtitle",
    CourseController.addSubtitle
);
router.put(
    "/my-courses/edit-course/:courseid/:subtitleid/add-section",
    CourseController.addSection
);
router.put(
    "/my-courses/edit-course/:courseid/edit-subtitle/:subtitleid",
    CourseController.updateSubtitle
);
router.put(
    "/my-courses/edit-course/:courseid/:subtitleid/edit-section/:sectionid",
    CourseController.updateSection
);
router.put(
    "/my-courses/edit-course/:courseid/delete-subtitle/:subtitleid/",
    CourseController.deleteSubtitle
);
router.put(
    "/my-courses/edit-course/:courseid/:subtitleid/delete-section/:sectionid",
    CourseController.deleteSection
);

router.post("/create-course", CourseController.createCourse);

module.exports = router;
