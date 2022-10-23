const express = require("express");
const router = express.Router();
const connect = require("../../config/database");
const Trainee = require("../../models/Trainee");

router.post("/", (req, res) => {
  const trainee = new Trainee({
    username: req.body.username,
    password: req.body.password,
    country: req.body.country,
    type: req.body.type,
  });
  connect();
  trainee.save();
});

module.exports = router;
