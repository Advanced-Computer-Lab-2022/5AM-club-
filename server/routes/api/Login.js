const express = require("express");
const router = express.Router();
const UserDataController = require("../../controllers/UserDataController");

router.post("/login", UserDataController.login);

module.exports = router;
