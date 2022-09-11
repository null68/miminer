const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'ores' });
  }
  getOrePrice(ore) {
    switch (ore) {
      case 'cobblestone':
        return 0.5;
      case 'coal':
        return 1;
      case 'iron':
        return 3.75;
      case 'gold':
        return 4.5;
      case 'diamond':
        return 8.25;
      case 'netherite':
        return 9;
      case 'emerald':
        return 12;
      case 'obsidian':
        return 7;
    }
  }
};
