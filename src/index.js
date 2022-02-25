require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("Social:Index:");
const connectDatabase = require("./db");
const app = require("./server/index");
const serverStart = require("./server/serverStart");

const port = process.env.PORT || 4000;
const dbConnect = process.env.MONGODB_STRING;
(async () => {
  try {
    await connectDatabase(dbConnect);
    await serverStart(port, app);
  } catch (error) {
    debug(chalk.red(error.message));
  }
})();
