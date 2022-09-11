const chalk = require('chalk');
const Util = require('../structures/cores/util');
module.exports = class Logger extends Util {
  constructor(client) {
    super(client, { name: 'logger' });
  }
  async info(text) {
    console.log(
      `${chalk.bold('[')}${chalk.cyanBright('INFO')}${chalk.bold(
        ']'
      )} ${chalk.greenBright('-')} ${text}`
    );
  }
  async warn(text) {
    console.log(
      `${chalk.bold('[')}${chalk.yellowBright('WARN')}${chalk.bold(
        ']'
      )} ${chalk.greenBright('-')} ${text}`
    );
  }
  async error(text) {
    console.log(
      `${chalk.bold('[')}${chalk.redBright('ERROR')}${chalk.bold(
        ']'
      )} ${chalk.greenBright('-')} ${text}`
    );
  }
};
