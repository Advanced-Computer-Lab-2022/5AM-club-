const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.get("/get-user", UserDataController.getUser);
router.put("/set-country", UserDataController.setCountry);
router.put("/edit-biography", UserDataController.editBiographyInstructor);
router.put("/edit-email", UserDataController.editEmailInstructor);
router.get("/get-users", UserDataController.getUsers);
router.post("/add-admin", UserDataController.addAdmin);
router.post("/add-instructor", UserDataController.addInstructor);
router.post("/add-corporate-trainee", UserDataController.addTrainee);
module.exports = router;
