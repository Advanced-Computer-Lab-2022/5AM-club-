const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.get("/get-user", UserDataController.getUser);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
router.put("/set-country", UserDataController.setCountry);
router.put(
  "/edit-personal-info",
  UserDataController.editPersonalInformationInstructor
);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
router.put("/set-country", UserDataController.setCountry);
router.put("/edit-trainee-course", UserDataController.updateTraineeCourse);
router.post("/add-admin", UserDataController.addAdmin);
router.post("/add-instructor", UserDataController.addInstructor);
router.post("/add-corporate-trainee", UserDataController.addTrainee);
router.post("/signUp", UserDataController.signUp);
router.post("/login", UserDataController.login);

router.put("/change-password", UserDataController.changePassword);
module.exports = router;
