const express = require("express");
const cors = require("cors");
const connect = require("./config/database");

const app = express();
const port = process.env.port || 4000;

connect();

app.use(cors());
app.use("/courses", require("./routes/api/Course"));
app.listen(port);
