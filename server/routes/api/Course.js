const express = require("express");
const router = express.Router();
const CourseController = require("../../controllers/CourseController");

router.get("/my-courses", CourseController.getMyCourses);
router.get("/courses", CourseController.getCourses);
router.get("/my-populated-courses", CourseController.getMyPopulatedCourses);
router.get("/populated-courses", CourseController.getPopulatedCourses);
router.get("/courses/course-max-min", CourseController.getCourseMaxMin);
<<<<<<< HEAD
router.get("/courses/course-subjects", CourseController.getCourseSubjects);
=======
router.put(
    "/courses/increment-views/:id",
    CourseController.incrementCourseViews
);

>>>>>>> f84a665 (bugs fixing)
router.get("/courses/:id/set-promotion", CourseController.setCoursePromotion);
router.get("/courses/:id", CourseController.findCourseByID);
router.get("/populated-courses/:id", CourseController.findPopulatedCourseByID);

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

router.delete(
    "/my-courses/edit-course/:id/delete-course",
    CourseController.deleteCourse
);

module.exports = router;
