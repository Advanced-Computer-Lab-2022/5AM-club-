const express = require("express");
const app = express();
const port = process.env.port || 4000;
const connect = require("./config/database.js");
const Admins = require("./models/Admin");
const Instructors = require("./models/Instructor");
const Trainees = require("./models/Trainee");
app.listen(port);

app.post("/addAdmin", (req,res)=>{
    const newAdmin = new Admins(req.body);
    newAdmin.save().then(() => console.log("Admin added successfully")).catch((err) => console.log(err));
    res.send("new admin added successfully");
});

app.post("/addInstructor", (req,res)=>{
    const newInstructor = new Instructors(req.body);
    newInstructor.save().then(() => console.log("Instructor added successfully")).catch((err) => console.log(err));
    res.send("new instructor added successfully");
});

app.post("/addCorporateTrainee", (req,res)=>{
    const newCorporateTrainee = new Trainees(req.body);
    newCorporateTrainee.save().then(() => console.log("Trainee added successfully")).catch((err) => console.log(err));
    res.send("new corporate trainee added successfully");
});
