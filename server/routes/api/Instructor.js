const express = require("express");
const router = express.Router();
const InstructorController = require("../../controllers/InstructorController");
const { checkID } = require("../../middleware/validation");
router.get("/my-courses", checkID, InstructorController.getUserCourses);

module.exports = router;
