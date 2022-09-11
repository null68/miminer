const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, { name: 'repair', description: 'Repair your pickaxe!' });
  }
  async init(interaction) {
    const user = await this.client.utils.user.getdb(interaction.member.id);
    if (!user) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have an pickaxe yet! First create inventory with \`/start\` command and you'll get a pickaxe!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    let pickaxe = await this.client.utils.pickaxes.getCurrentPickaxeData(user);
    if (
      pickaxe.durability ==
      this.client.config.pickaxeData[pickaxe.pickaxe].maxDurability
    ) {
      return interaction.createMessage({
        embeds: [
          {
            description: 'Your pickaxe is already at full durability!',
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }

    let cost = await this.client.utils.pickaxes.getRepairPrice(pickaxe.pickaxe);
    if (user.money < cost) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have enough money to repair your pickaxe! You need $${cost}!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
    if (
      await this.client.utils.cooldowns.hasRaw(interaction.member.id, 'repair')
    ) {
      await this.client.utils.cooldowns.remove(interaction.member.id, 'repair');
    }
    user.money -= cost;
    pickaxe.durability =
      this.client.config.pickaxeData[pickaxe.pickaxe].maxDurability;
    await user.save();
    return interaction.createMessage({
      embeds: [
        {
          description: `You've repaired your pickaxe!`,
          color: 0x00ff00,
        },
      ],
    });
  }
};
