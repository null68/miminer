const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      description: 'Invite the bot to your server',
    });
  }
  async init(interaction) {
    interaction.createMessage({
      embeds: [
        {
          title: 'Invite',
          color: 0x7289da,
          description:
            '[Add bot to your server](https://discord.com/api/oauth2/authorize?client_id=1011071243224629329&permissions=281600&scope=bot%20applications.commands)',
        },
      ],
    });
  }
};
