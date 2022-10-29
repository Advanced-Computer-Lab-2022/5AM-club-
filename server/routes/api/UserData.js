const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.put("/set-country", UserDataController.setCountry);

module.exports = router;
