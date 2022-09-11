const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'changepickaxe',
      description: 'Change your pickaxe',
      options: [
        {
          name: 'id',
          description: 'ID of pickaxe you want to use',
          type: 3,
        },
      ],
    });
  }
  async init(interaction) {
    let user = await this.client.utils.user.getdb(interaction.member.id);
    if (!user) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You can't change your pickaxe without an inventory! Create one with \`/start\` command.`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    let pickaxe = interaction.data.options
      ? interaction.data.options[0].value
      : null;
    if (!pickaxe) {
      let picks = 'Your pickaxes:\n';
      let enchants = '';
      for (let pick of user.pickaxes) {
        if (pick.enchantments.length > 0) {
          for (let enchant of pick.enchantments) {
            enchants += `${
              this.client.config.emoji.enchanted_book
            } ${this.client.utils.enchantments.getCurrentEnchantName(
              enchant.name
            )} - Level ${enchant.level}\n`;
          }
        }
        if (pick.pickaxe == user.currentPickaxe) {
          picks += `ID: **${this.client.utils.items.getItemID(
            pick.pickaxe
          )} ${this.client.utils.pickaxes.getCurrentPickaxeName(
            pick.pickaxe
          )} - Durability: \`${pick.durability}/${
            this.client.config.pickaxeData[pick.pickaxe].maxDurability
          }\`\n${enchants}**`;
          enchants = '';
          continue;
        }
        picks += `ID: ${this.client.utils.items.getItemID(
          pick.pickaxe
        )} - ${this.client.utils.pickaxes.getCurrentPickaxeName(
          pick.pickaxe
        )} - Durability: \`${pick.durability}/${
          this.client.config.pickaxeData[pick.pickaxe].maxDurability
        }\`\n${enchants}`;
        enchants = '';
      }

      return interaction.createMessage({
        embeds: [
          {
            description: picks,
            color: 0xff0000,
          },
        ],
      });
    }
    let pickname = this.client.utils.items.getItemNameFromID(pickaxe);
    if (pickname == user.currentPickaxe) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You already have that pickaxe equipped!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }

    if (!user.pickaxes.find(x => x.pickaxe == pickname)) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have this pickaxe!`,
            color: 0xff0000,
          },
        ],
      });
    }
    user.currentPickaxe = pickname;
    await user.save();
    return interaction.createMessage({
      embeds: [
        {
          description: `You've changed your pickaxe to ${this.client.utils.pickaxes.getCurrentPickaxeName(
            pickname
          )} pickaxe!`,
          color: 0x1e8449,
        },
      ],
    });
  }
};
