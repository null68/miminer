const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'dailychest',
      description: 'Open your daily chest!',
    });
  }
  async init(interaction) {
    if (
      await this.client.utils.cooldowns.has(interaction.member.id, 'dailychest')
    ) {
      return interaction.createMessage({
        embeds: [
          {
            description: `You already opened your daily chest today!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
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
    await this.client.utils.cooldowns.set(
      interaction.member.id,
      'dailychest',
      Date.now() + 86400000
    );
    let rewards = this.client.utils.number.randomint(0, 2);
    if (rewards == 0) {
      let emeralds = this.client.utils.number.randomint(0, 3);
      let redstone = this.client.utils.number.randomint(3, 12);
      let lapis = this.client.utils.number.randomint(1, 6);
      user.inventory.emerald += emeralds;
      user.inventory.redstone += redstone;
      user.inventory.lapis += lapis;
      await user.save();
      return interaction.createMessage({
        embeds: [
          {
            title: 'Daily Chest',
            description: `${
              this.client.config.emoji.chest
            }You opened your daily chest and got ${
              emeralds > 0
                ? emeralds + ' ' + this.client.config.emoji.emerald + ','
                : ''
            } ${redstone + ' ' + this.client.config.emoji.redstone} and ${
              lapis + ' ' + this.client.config.emoji.lapis
            }!`,
            color: 0x1e8449,
          },
        ],
      });
    } else if (rewards == 1) {
      let coal = this.client.utils.number.randomint(1, 7);
      let redstone = this.client.utils.number.randomint(2, 5);
      user.inventory.coal += coal;
      user.inventory.redstone += redstone;
      await user.save();
      return interaction.createMessage({
        embeds: [
          {
            title: 'Daily Chest',
            description: `You opened your daily chest and got ${
              coal + ' ' + this.client.config.emoji.coal
            }${
              redstone > 0
                ? ' and ' + redstone + ' ' + this.client.config.emoji.redstone
                : ''
            }!`,
            color: 0x1e8449,
          },
        ],
      });
    } else {
      let gold = this.client.utils.number.randomint(1, 7);
      let diamond = this.client.utils.number.randomint(1, 3);
      user.inventory.gold += gold;
      user.inventory.diamond += diamond;
      await user.save();
      return interaction.createMessage({
        embeds: [
          {
            title: 'Daily Chest',
            description: `You opened your daily chest and got ${
              gold + ' ' + this.client.config.emoji.gold + ' '
            }and ${diamond + ' ' + this.client.config.emoji.diamond}!`,
            color: 0x1e8449,
          },
        ],
      });
    }
  }
};
