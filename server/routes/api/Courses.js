const CoursesController = require("../../controllers/CoursesController");
const express = require("express");
const router = express.Router();

router.get("/", CoursesController.filterCourses);
router.get("/:id", CoursesController.findCourseByID);

module.exports = router;
