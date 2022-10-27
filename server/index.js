const express = require("express");
const connect = require("./config/database");
const Course = require("./models/Course");

const app = express();
const port = process.env.port || 4000;
const courseRouter = require("./routes/api/Course");

app.use(express.json({ extended: false }));

app.use("/courses", require("./routes/api/Courses"));

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/instructor", courseRouter);
app.listen(port);

connect();

/*new Instructor({
  username: "ali12",
  password: "ali",
  email: "ali",
  country: "ali",
  money_owed: 0,
  rating: 0,
  courses: ["635527b4d06fb801bd4d2b89"],
}).save();*/

new Course({
  title: "alilflhjbasdjsjs",
  minutes: 120,
  rating: 1,
  price: 12,

  subject: ["node", "akm"],
  summary: "asdas",
  instructor: ["63552bf06a3ced30a5d55164", "63550f3b2af3e5e9f97d9732"],

  userReviews: [],
}).save();
