const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'start',
      description: 'Start the mining journey!',
    });
  }
  async init(interaction) {
    let newMiner = await this.client.utils.user.newminer(interaction.member.id);
    if (newMiner) {
      return interaction.createMessage({
        embeds: [
          {
            title: 'Welcome to the mining journey!',
            description: `You have been given a wooden pickaxe.`,
            color: 0x1e8449,
          },
        ],
      });
    } else {
      return interaction.createMessage({
        embeds: [
          {
            description: `You already started the mining journey!!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });
    }
  }
};
