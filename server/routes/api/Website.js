const express = require("express");
const router = express.Router();
const WebsiteController = require("../../controllers/WebsiteController");

router.get("/contract", WebsiteController.getContract);
router.get("/terms-of-service", WebsiteController.getTOS);

module.exports = router;
