const express = require("express");
const cors = require("cors");
const connect = require("./config/database");

const app = express();
const port = process.env.port || 4000;

connect();

app.use(cors());
app.use("/instructor", require("./routes/api/Instructor"));
app.listen(port);
