const express = require("express");
const router = express.Router();
const InstructorController = require("../../controllers/InstructorController");

router.get("/", InstructorController.getAllCourses);
router.get("/viewcourses/", InstructorController.getUserCourses);
router.get("/viewcourses/filter", InstructorController.filterCourses);

module.exports = router;
