const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'buy',
      description: 'Buy an item from the shop',
      options: [
        {
          name: 'item',
          description: 'The item you want to buy',
          type: 3,
          required: true,
          choices: [
            { name: 'pickaxe', value: 'pickaxe' },
            { name: 'enchant', value: 'enchant' },
          ],
        },
        {
          name: 'id',
          description: 'The id of the item you want to buy',
          type: 10,
          required: true,
        },
      ],
    });
  }
  async init(interaction) {
    let item = interaction.data.options[0].value;
    let id = interaction.data.options[1].value;
    let user = await this.client.utils.user.getdb(interaction.member.id);
    switch (item) {
      case 'pickaxe':
        let pickaxe = this.client.utils.shop.getShopItem('pickaxe', id);
        if (!pickaxe)
          return interaction.createMessage({
            embeds: [
              {
                title: 'Error',
                color: 0xe74c3c,
                description: 'That pickaxe does not exist',
              },
            ],
            flags: 64,
          });
        if (user.pickaxes.find(i => i.pickaxe == pickaxe.name))
          return interaction.createMessage({
            embeds: [
              {
                title: 'Error',
                color: 0xe74c3c,
                description: 'You already have that pickaxe',
              },
            ],
            flags: 64,
          });

        if (pickaxe.moneyType == 'money') {
          if (user.money < pickaxe.price)
            return interaction.createMessage({
              embeds: [
                {
                  title: 'Error',
                  color: 0xe74c3c,
                  description: 'You do not have enough money',
                },
              ],
              flags: 64,
            });
          user.money -= pickaxe.price;
        }
        if (pickaxe.moneyType == 'emerald') {
          if (user.inventory.emerald < pickaxe.price)
            return interaction.createMessage({
              embeds: [
                {
                  title: 'Error',
                  color: 0xe74c3c,
                  description: 'You do not have enough emeralds',
                },
              ],
              flags: 64,
            });
          user.inventory.emerald -= pickaxe.price;
        }
        user.pickaxes.push({
          pickaxe: pickaxe.name,
          durability:
            this.client.config.pickaxeData[pickaxe.name].maxDurability,
          enchantments: [],
        });
        await user.save();
        return interaction.createMessage({
          embeds: [
            {
              title: 'Success',
              color: 0x1e8449,
              description: `You have bought the ${this.client.utils.pickaxes.getCurrentPickaxeName(
                pickaxe.name
              )} pickaxe`,
            },
          ],
        });
      case 'enchant':
        let enchant = this.client.utils.shop.getShopItem('enchant', id);
        if (!enchant)
          return interaction.createMessage({
            embeds: [
              {
                title: 'Error',
                color: 0xe74c3c,
                description: 'That enchant does not exist',
              },
            ],
            flags: 64,
          });
        let currentpickaxe =
          await this.client.utils.pickaxes.getCurrentPickaxeData(user);
        let nextLevel =
          currentpickaxe.enchantments.find(i => i.name == enchant.name)?.level +
            1 || 1;

        if (
          currentpickaxe.enchantments?.find(i => i.name == enchant.name)
            ?.level == enchant.maxLevel
        ) {
          return interaction.createMessage({
            embeds: [
              {
                title: 'Error',
                color: 0xe74c3c,
                description: 'You already have that enchant at max level',
              },
            ],
            flags: 64,
          });
        }
        if (user.inventory.lapis < enchant.levels[nextLevel - 1].price)
          return interaction.createMessage({
            embeds: [
              {
                title: 'Error',
                color: 0xe74c3c,
                description:
                  'You do not have enough ' +
                  this.client.config.emoji.lapis +
                  ' to buy that enchant',
              },
            ],
            flags: 64,
          });
        if (!currentpickaxe.enchantments.find(i => i.name == enchant.name)) {
          user.inventory.lapis -= enchant.levels[nextLevel - 1].price;
          currentpickaxe.enchantments.push({
            name: enchant.name,
            level: 1,
          });
          await user.save();
          return interaction.createMessage({
            embeds: [
              {
                title: 'Success',
                color: 0x1e8449,
                description: `You have bought the ${enchant.name} enchant ${this.client.config.emoji.enchanted_book}`,
              },
            ],
          });
        }
        user.inventory.lapis -= enchant.levels[nextLevel - 1].price;
        currentpickaxe.enchantments.find(
          i => i.name == enchant.name
        ).level += 1;
        await user.save();
        return interaction.createMessage({
          embeds: [
            {
              title: 'Success',
              color: 0x1e8449,
              description: `You have upgraded the ${enchant.name} enchant ${this.client.config.emoji.enchanted_book}`,
            },
          ],
        });
    }
  }
};
