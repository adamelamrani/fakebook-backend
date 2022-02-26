require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/usersRouters");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/login", router);
module.exports = app;
