const express = require("express");
const router = express.Router();
const LoginController = require("../../controllers/AuthController");
//const { checkID } = require("../../middleware/Validation");
//router.get("/my-courses", checkID, CourseController.getUserCourses);
router.post("/login", LoginController.login);

module.exports = router;
