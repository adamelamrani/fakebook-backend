require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/usersRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/user", router);
module.exports = app;
