const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'View the commands ',
    });
  }
  async init(interaction) {
    let msg = '**Commands**\n';
    for (let command of this.client.commands) {
      msg += `**\`/${command[1].options.name}\`** - ${command[1].options.description}\n`;
    }
    return interaction.createMessage({
      embeds: [{ title: 'Help', color: 0x1e8449, description: msg }],
    });
  }
};
