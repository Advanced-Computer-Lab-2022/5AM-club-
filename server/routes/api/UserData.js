const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");
const authenticateToken = require("../../middleware/authentication");

router.get("/get-user", UserDataController.getUser);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
router.get("/accept-contract", UserDataController.acceptContract);
router.get("/get-users", UserDataController.getUsers);
router.get("/get-trainee-course", UserDataController.getTraineeCourse);
router.get("/get-course-instructor", UserDataController.getCourseInstructor);
router.get("/get-user-type", UserDataController.getUserType);
router.get("/complete-profile", UserDataController.checkCompleteProfile);

router.post("/add-admin", UserDataController.addAdmin);
router.post("/add-instructor", UserDataController.addInstructor);
router.post("/add-corporate-trainee", UserDataController.addTrainee);
router.post("/signUp", UserDataController.signUp);
router.post("/login", UserDataController.login);
router.get("/logout", UserDataController.logout);

router.put("/set-country", UserDataController.setCountry);
router.put(
  "/edit-personal-info",
  UserDataController.editPersonalInformationInstructor
);
router.put("/set-country", UserDataController.setCountry);
router.put("/edit-trainee-course", UserDataController.updateTraineeCourse);
router.put("/change-password-email", UserDataController.changePasswordEmail);
router.put(
  "/change-password",
  authenticateToken,
  UserDataController.changePassword
);
router.put("/update-profile", UserDataController.updateProfile);
//router.get("/decode-token", UserDataController.decodeToken);

module.exports = router;
