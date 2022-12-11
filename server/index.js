const express = require("express");
const connect = require("./config/database");
const userDataRouter = require("./routes/api/UserData");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.port || 8888;
const path = require("path");
const Instructor = require("./models/Instructor");
const Trainee = require("./models/Trainee");
const Admin = require("./models/Admin");
const Contract = require("./models/Contract");
const courseRouter = require("./routes/api/Course");
const reviewRouter = require("./routes/api/Review");
const authenticateToken = require("./middleware/authentication");

connect();
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        optionsSuccessStatus: 200,
        credentials: true,
        origin: "http://localhost:3000",
    })
);
app.use((req, res, next) => {
    console.log("intooo");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use("/api/", courseRouter);
app.use("/api/instructor", authenticateToken, courseRouter);
app.use("/api/admin", authenticateToken, courseRouter);
app.use("/api/trainee", authenticateToken, courseRouter);
app.use("/api/instructor", authenticateToken, userDataRouter);
app.use("/api/trainee", authenticateToken, userDataRouter);
app.use("/api/admin", authenticateToken, userDataRouter);
app.use("/api/", userDataRouter);
app.use("/api/instructor", authenticateToken, reviewRouter);
app.use("/api/trainee", authenticateToken, reviewRouter);
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port);
/*

635ad854b2ad88bd8358a5af*/

/*new Course({
  title: "Node.js API Masterclass With MongoDB & Express",
  minutes: 120,
  rating: 1,
  price: 12,

  subject: ["node", "express", "MongoDB"],
  summary:
    "This is a project based course where we build an extensive, in-depth backend API for DevCamper, a bootcamp directory API. We will start from scratch and end up with a professional deployed API with documentation. We will dive deep into Node, Express and MongoDB. Here is some of what you will learn in this course and project HTTP Essentials, Postman Client, RESTful APIs, Express Framework, Routing & Controller Methods and MongoDB Atlas & CompassWeb development is changing. We used to render all of our views and templates on the server, but since the rise of frontend frameworks like React, Angular and Vue, we are now splitting projects up into backend and frontend, where the backend is doing all of the database interaction and serving JSON and the frontend is fetching that data and creating the user interface to interact with. This course will teach you the entire backend side of things so that you can build extensive APIs and then use whatever you want on the frontend.We will do a lot more than just build a simple CRUD REST API like many other Node.js and Express tutorials. We will be implementing authentication, roles and permissions, password reset tokens, email functionality, geocoding and much more. This course teaches what it's like to be a real backend engineer.",
  promotion: { percentage: 10, deadline: "11/11/2022" },
  instructor: ["637a6d49975cfe9d52de4747", "63550f3b2af3e5e9f97d9732"],

  userReviews: [],
  subtitles: [
    {
      title: "Welcome to the course",
      minutes: 16,
      description: "description",
      sections: [
        { title: "section 1", minutes: 5, description: "description" },
        { title: "section 2", minutes: 6, description: "description" },
        { title: "exercise 1", minutes: 4, description: "description" },
      ],
    },
    {
      title: "Introduction to HTTP",
      minutes: 32,
      description: "description",
      sections: [
        { title: "section 1", minutes: 10, description: "description" },
        { title: "exercise 1", minutes: 4, description: "description" },
        { title: "section 2", minutes: 14, description: "description" },
        { title: "exercise 2", minutes: 4, description: "description" },
      ],
    },
    {
      title: "Introduction to Mongodb",
      minutes: 64,
      description: "description",
      sections: [
        { title: "section 1", minutes: 10, description: "description" },
        { title: "exercise 1", minutes: 4, description: "description" },
        { title: "section 2", minutes: 13, description: "description" },
        { title: "exercise 2", minutes: 4, description: "description" },
        { title: "section 3", minutes: 11, description: "description" },
        { title: "exercise 3", minutes: 4, description: "description" },
        { title: "section 4", minutes: 14, description: "description" },
        { title: "exercise 4", minutes: 4, description: "description" },
      ],
    },
  ],
}).save();*/
