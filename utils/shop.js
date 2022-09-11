const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'shop' });
    this.shopItems = [
      {
        name: 'stone',
        description: 'A stone pickaxe',
        moneyType: 'money',
        price: 500,
        id: 1,
        type: 'pickaxe',
      },
      {
        name: 'iron',
        description: 'An iron pickaxe',
        moneyType: 'money',
        price: 2500,
        id: 2,
        type: 'pickaxe',
      },
      {
        name: 'gold',
        description: 'A golden pickaxe',
        moneyType: 'money',
        price: 1700,
        id: 3,
        type: 'pickaxe',
      },
      {
        name: 'diamond',
        description: 'A diamond pickaxe',
        moneyType: 'money',
        price: 3000,
        id: 4,
        type: 'pickaxe',
      },
      {
        name: 'netherite',
        description: 'A netherite pickaxe',
        moneyType: 'money',
        price: 4500,
        id: 5,
        type: 'pickaxe',
      },
      {
        name: 'emerald',
        description: 'An emerald pickaxe',
        moneyType: `emerald`,
        price: 450,
        id: 6,
        type: 'pickaxe',
      },
      {
        name: 'efficiency',
        description: 'Increases the efficiency of your pickaxe',
        maxLevel: 5,
        moneyType: 'lapis',
        id: 1,
        type: 'enchant',
        levels: [
          {
            level: 1,
            price: 100,
          },
          {
            level: 2,
            price: 200,
          },
          {
            level: 3,
            price: 300,
          },
          {
            level: 4,
            price: 400,
          },
          {
            level: 5,
            price: 500,
          },
        ],
      },
      {
        name: 'fortune',
        description: 'Increases the fortune of your pickaxe',
        moneyType: 'lapis',
        maxLevel: 3,
        id: 2,
        type: 'enchant',
        levels: [
          {
            level: 1,
            price: 100,
          },
          {
            level: 2,
            price: 200,
          },
          {
            level: 3,
            price: 300,
          },
        ],
      },
      {
        name: 'unbreaking',
        description: 'Increases the unbreaking of your pickaxe',
        moneyType: 'lapis',
        maxLevel: 3,
        id: 3,
        type: 'enchant',
        levels: [
          {
            level: 1,
            price: 100,
          },
          {
            level: 2,
            price: 200,
          },
          {
            level: 3,
            price: 300,
          },
        ],
      },
    ];
  }
  getShopItems() {
    return this.shopItems;
  }
  getShopItem(type, id) {
    return this.shopItems.find(item => item.id == id && item.type == type);
  }
  getEnchantPrice(enchant, level) {
    return this.shopItems
      .find(item => item.name == enchant)
      ?.levels.find(lvl => lvl.level == level).price;
  }
};
