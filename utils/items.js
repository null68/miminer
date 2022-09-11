const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'items' });
    this.items = [
      {
        name: 'wood',
        description: 'A wooden pickaxe',
        id: 0,
        type: 'pickaxe',
      },
      {
        name: 'stone',
        description: 'A stone pickaxe',

        id: 1,
        type: 'pickaxe',
      },
      {
        name: 'iron',
        description: 'An iron pickaxe',

        id: 2,
        type: 'pickaxe',
      },
      {
        name: 'gold',
        description: 'A golden pickaxe',

        id: 3,
        type: 'pickaxe',
      },
      {
        name: 'diamond',
        description: 'A diamond pickaxe',

        id: 4,
        type: 'pickaxe',
      },
      {
        name: 'netherite',
        description: 'A netherite pickaxe',

        id: 5,
        type: 'pickaxe',
      },
      {
        name: 'emerald',
        description: 'An emerald pickaxe',

        id: 6,
        type: 'pickaxe',
      },
      {
        name: 'special',
        description: 'A special pickaxe',
        id: 7,
        type: 'pickaxe',
      },
      {
        name: 'donator',
        description: 'A donator pickaxe',
        id: 8,
        type: 'pickaxe',
      },
    ];
  }
  getItemID(pickaxe) {
    return this.items.find(item => item.name == pickaxe).id;
  }
  getItemNameFromID(id) {
    return this.items.find(item => item.id == id).name;
  }
};
