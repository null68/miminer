const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'shop',
      description: 'View the items in the shop',
    });
  }
  async init(interaction) {
    let items = this.client.utils.shop.getShopItems();
    let user = await this.client.utils.user.getdb(interaction.member.id);
    if (!user) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have an inventory yet! Create one with \`/start\` command.`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    let pickaxes =
      '** ' + this.client.config.emoji.compass + ' Pickaxe Shop**\n';
    let enchants =
      '** ' + this.client.config.emoji.enchantment_table + ' Enchant Shop**\n';
    for (let item of items) {
      if (item.type == 'pickaxe') {
        if (item.moneyType == 'money')
          pickaxes += `**${
            item.id
          }.** ${this.client.utils.pickaxes.getCurrentPickaxeName(
            item.name
          )} pickaxe - $${item.price}\n`;
        else
          pickaxes += `**${
            item.id
          }.** ${this.client.utils.pickaxes.getCurrentPickaxeName(
            item.name
          )} pickaxe - ${
            item.price + this.client.config.emoji[item.moneyType]
          }\n`;
      } else if (item.type == 'enchant') {
        if (item.name == 'efficiency') {
          enchants += `**${
            item.id
          }.** ${this.client.config.emoji.enchanted_book} ${this.client.utils.enchantments.getCurrentEnchantName(
            item.name
          )} - ${
            this.client.utils.enchantments.getEfficiency(user) == 5
              ? 'Max'
              : this.client.utils.shop.getEnchantPrice(
                  item.name,
                  this.client.utils.enchantments.getEfficiency(user) + 1
                ) + this.client.config.emoji[item.moneyType]
          }\n`;
        } else if (item.name == 'fortune') {
          enchants += `**${
            item.id
          }.** ${this.client.config.emoji.enchanted_book} ${this.client.utils.enchantments.getCurrentEnchantName(
            item.name
          )} - ${
            this.client.utils.enchantments.getFortune(user) == 3
              ? 'Max'
              : this.client.utils.shop.getEnchantPrice(
                  item.name,
                  this.client.utils.enchantments.getFortune(user) + 1
                ) + this.client.config.emoji[item.moneyType]
          }\n`;
        } else if (item.name == 'unbreaking') {
          enchants += `**${
            item.id
          }.** ${this.client.config.emoji.enchanted_book} ${this.client.utils.enchantments.getCurrentEnchantName(
            item.name
          )} - ${
            this.client.utils.enchantments.getUnbreaking(user) == 5
              ? 'Max'
              : this.client.utils.shop.getEnchantPrice(
                  item.name,
                  this.client.utils.enchantments.getUnbreaking(user) + 1
                ) + this.client.config.emoji[item.moneyType]
          }\n`;
        }
      }
    }
    return interaction.createMessage({
      embeds: [
        {
          title: 'Shop',
          color: 0x1e8449,
          description: pickaxes + '\n' + enchants,
        },
      ],
    });
  }
};
