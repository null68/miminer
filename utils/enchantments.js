const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'enchantments' });
  }
  getCurrentEnchantName(enchantment) {
    switch (enchantment) {
      case 'efficiency':
        return 'Efficiency';
      case 'fortune':
        return 'Fortune';
      case 'unbreaking':
        return 'Unbreaking';
    }
  }
  getEfficiency(doc) {
    return (
      this.client.utils.pickaxes
        .getCurrentPickaxeData(doc)
        .enchantments?.find(i => i.name == 'efficiency')?.level || 0
    );
  }
  getFortune(doc) {
    return (
      this.client.utils.pickaxes
        .getCurrentPickaxeData(doc)
        .enchantments?.find(i => i.name == 'fortune')?.level || 0
    );
  }
  getUnbreaking(doc) {
    return (
      this.client.utils.pickaxes
        .getCurrentPickaxeData(doc)
        .enchantments?.find(i => i.name == 'unbreaking')?.level || 0
    );
  }

  getEfficiencyRatio(doc) {
    switch (this.getEfficiency(doc)) {
      case 0:
        return 0;
      case 1:
        return 5000;
      case 2:
        return 7500;
      case 3:
        return 10000;
      case 4:
        return 12500;
      case 5:
        return 15000;
      default:
        return 0;
    }
  }
  getFortuneRatio(doc) {
    switch (this.getFortune(doc)) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 5;
      default:
        return 1;
    }
  }
  getUnbreakingRatio(doc) {
    switch (this.getUnbreaking(doc)) {
      case 0:
        return 0;
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
        return 30;
      case 4:
        return 40;
      case 5:
        return 50;
      default:
        return 0;
    }
  }
};
