const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, {
      name: 'level',
    });
  }
  getLevelXP(level) {
    return 50 + (150 * 80) / 100 + 3 * Math.pow(level - 1, 3);
  }
};
