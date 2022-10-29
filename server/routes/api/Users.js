const express = require("express");
const router = express.Router();

router.put("/", require("../../controllers/UserController"));

module.exports = router;
