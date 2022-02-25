const chalk = require("chalk");
const debug = require("debug")("Social:Errors-middleware;");

const notFound = (req, res) => {
  res.status(404).json({ error: true, message: "Resource not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.bgBlack.redBright(`Woops! ${err.message}`));
  const errorCode = err.code ?? 500;
  const errorMessage = err.code ? err.message : "General error";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = { notFound, generalError };
