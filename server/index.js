const express = require("express");
const app = express();
const port = process.env.port || 4000;
const connect = require("./config/database.js");
const Admins = require("./models/Admin");
const Instructors = require("./models/Instructor");
const Trainees = require("./models/Trainee");
app.listen(port);
app.use("/admin",require("./routes/api/Admin"))