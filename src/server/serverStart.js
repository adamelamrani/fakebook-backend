const debug = require("debug")("Social:Server:");
const chalk = require("chalk");

const serverStart = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgBlack.yellow(`Server listening at http://localhost:${port}`)
      );
      resolve();
    });
    server.on("error", (error) => {
      debug(chalk.bgRedBright.blackBright(`Error on server ${error.message}`));
      reject(new Error(`Error on server ${error.message}`));
    });
  });

module.exports = serverStart;
