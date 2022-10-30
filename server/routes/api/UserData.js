const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.get("/get-user", UserDataController.getUser);
router.put("/set-country", UserDataController.setCountry);
router.get("/get-users", UserDataController.getUsers);

module.exports = router;
