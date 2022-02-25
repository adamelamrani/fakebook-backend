require("dotenv").config();
const debug = require("debug")("Social:Database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDatabase = (dbConnection) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.set("returnOriginal");
    mongoose.connect(dbConnection, (error) => {
      if (error) {
        debug(chalk.red(`Error connecting to database: ${error.message}`));
        reject(new Error(`Error: ${error.message}`));
      }
      debug(chalk.blueBright("Connection to Database successfull"));
      resolve();
    });
  });

module.exports = connectDatabase;
