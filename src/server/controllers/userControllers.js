require("dotenv").config();
const debug = require("debug")("Social:UserControllers:");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (!username) {
      const error = new Error("Something went wrong");
      debug(chalk.red(`Username not found: ${error}`));
      res.status(404).json(error);
    } else {
      const passwordComparison = await bcrypt.compare(password, user.password);

      if (!passwordComparison) {
        const error = new Error("Something went wrong");
        debug(chalk.red(`Wrong password: ${error}`));
        res.status(400).json(error.message);
        next(error);
      } else {
        const data = { username };
        const token = jwt.sign(data, process.env.SECRET_KEY);
        res.json({ token });
      }
    }
  } catch (error) {
    debug(chalk.bgRedBright.yellowBright(`Error: ${error.message}`));
    next(error);
  }
};

module.exports = login;
