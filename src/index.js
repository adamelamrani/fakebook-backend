require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("Social:Index:");
const app = require("./server/index");
const serverStart = require("./server/serverStart");

const port = process.env.PORT || 4000;
(async () => {
  try {
    await serverStart(port, app);
  } catch (error) {
    debug(chalk.red(error.message));
  }
})();
