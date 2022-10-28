const express = require("express");
const cors = require("cors");
const connect = require("./config/database");

const app = express();
const port = process.env.port || 4000;
const courseRouter = require("./routes/api/Course");

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/instructor", courseRouter);
app.listen(port);
