const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.get("/get-user", UserDataController.getUser);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
router.get("/view-contract", UserDataController.viewContract);
router.get("/accept-contract", UserDataController.acceptContract);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);

router.post("/add-admin", UserDataController.addAdmin);
router.post("/add-instructor", UserDataController.addInstructor);
router.post("/add-corporate-trainee", UserDataController.addTrainee);
router.post("/signUp", UserDataController.signUp);
router.post("/login", UserDataController.login);

router.put("/set-country", UserDataController.setCountry);
router.put(
  "/edit-personal-info",
  UserDataController.editPersonalInformationInstructor
);
router.put("/set-country", UserDataController.setCountry);
router.put("/edit-trainee-course", UserDataController.updateTraineeCourse);
router.put("/change-password", UserDataController.changePassword);
router.put("/change-password-email", UserDataController.changePasswordEmail);

module.exports = router;
