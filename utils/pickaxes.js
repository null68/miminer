const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'pickaxes' });
  }
  getCurrentPickaxeData(doc) {
    let currentPickaxe = doc.currentPickaxe;
    return doc.pickaxes.find(pick => pick.pickaxe == currentPickaxe);
  }
  getCurrentPickaxeName(pickaxe) {
    switch (pickaxe) {
      case 'wood':
        return this.client.config.emoji.wooden_pickaxe + ' Wooden';
      case 'stone':
        return this.client.config.emoji.stone_pickaxe + ' Stone';
      case 'iron':
        return this.client.config.emoji.iron_pickaxe + ' Iron';
      case 'gold':
        return this.client.config.emoji.gold_pickaxe + ' Golden';
      case 'diamond':
        return this.client.config.emoji.diamond_pickaxe + ' Diamond';
      case 'netherite':
        return this.client.config.emoji.netherite_pickaxe + ' Netherite';
      case 'emerald':
        return this.client.config.emoji.emerald_pickaxe + ' Emerald';
      case 'special':
        return this.client.config.emoji.special_pickaxe + ' Special';
      case 'donator':
        return this.client.config.emoji.donator_pickaxe + ' Donator';
    }
  }
  async getLoot(pick) {
    let loot = new Array();
    switch (pick) {
      case 'wood':
        loot.push(
          `cobblestone:${this.client.utils.number.randomint(
            5,
            11
          )};coal:${this.client.utils.number.randomint(1, 8)}`
        );
        break;
      case 'stone':
        loot.push(
          `cobblestone:${this.client.utils.number.randomint(
            10,
            17
          )};coal:${this.client.utils.number.randomint(
            5,
            12
          )};iron:${this.client.utils.number.randomint(1, 5)}`
        );
        break;
      case 'gold':
        loot.push(
          `coal:${this.client.utils.number.randomint(
            10,
            22
          )};iron:${this.client.utils.number.randomint(
            7,
            12
          )};gold:${this.client.utils.number.randomint(5, 7)}`
        );
        break;
      case 'iron':
        loot.push(
          `coal:${this.client.utils.number.randomint(
            18,
            26
          )};iron:${this.client.utils.number.randomint(
            10,
            18
          )};diamond:${this.client.utils.number.randomint(2, 5)}`
        );
        break;
      case 'diamond':
        loot.push(
          `iron:${this.client.utils.number.randomint(
            28,
            36
          )};diamond:${this.client.utils.number.randomint(
            5,
            10
          )};obsidian:${this.client.utils.number.randomint(
            5,
            12
          )};netherite:${this.client.utils.number.randomint(1, 3)}`
        );
        break;
      case 'netherite':
        loot.push(
          `diamond:${this.client.utils.number.randomint(
            8,
            14
          )};netherite:${this.client.utils.number.randomint(
            5,
            10
          )};obsidian:${this.client.utils.number.randomint(12, 22)}`
        );
        break;
      case 'emerald':
        loot.push(
          `diamond:${this.client.utils.number.randomint(
            10,
            18
          )};netherite:${this.client.utils.number.randomint(
            8,
            16
          )};emerald:${this.client.utils.number.randomint(1, 4)}`
        );
        break;
      case 'special':
        loot.push(
          `diamond:${this.client.utils.number.randomint(
            20,
            30
          )};emerald:${this.client.utils.number.randomint(
            4,
            8
          )};netherite:${this.client.utils.number.randomint(
            10,
            20
          )};obsidian:${this.client.utils.number.randomint(16, 26)}`
        );
        break;
      case 'donator':
        loot.push(
          `obsidian:${this.client.utils.number.randomint(
            18,
            32
          )};diamond:${this.client.utils.number.randomint(
            16,
            24
          )};netherite:${this.client.utils.number.randomint(
            16,
            26
          )};emerald:${this.client.utils.number.randomint(5, 10)}`
        );
        break;
    }
    return loot;
  }
  getRepairPrice(pickaxe) {
    switch (pickaxe) {
      case 'wood':
        return 50;
      case 'stone':
        return 100;
      case 'iron':
        return 275;
      case 'gold':
        return 325;
      case 'diamond':
        return 550;
      case 'netherite':
        return 750;
      case 'emerald':
        return 800;
      case 'special':
        return 1000;
      case 'donator':
        return 1500;
    }
  }
};
