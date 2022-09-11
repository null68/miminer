const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'number' });
  }
  randomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
