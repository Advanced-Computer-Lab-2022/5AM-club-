const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.get("/get-user", UserDataController.getUser);
router.put("/set-country", UserDataController.setCountry);
router.put(
  "/edit-personal-info",
  UserDataController.editPersonalInformationInstructor
);
router.get("/get-users", UserDataController.getUsers);
router.post("/add-admin", UserDataController.addAdmin);
router.post("/add-instructor", UserDataController.addInstructor);
router.post("/add-corporate-trainee", UserDataController.addTrainee);
router.post("/signUp", UserDataController.signUp);
router.post("/login", UserDataController.login);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
module.exports = router;
