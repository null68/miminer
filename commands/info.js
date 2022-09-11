const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      description: 'Get information about the bot',
    });
  }
  async init(interaction) {
    return interaction.createMessage({
      embeds: [
        {
          title: 'Information',
          color: 0x3498db,
          fields: [
            {
              name: 'Developer',
              value: '<@568879871116443679>',
              inline: true,
            },
            {
              name: 'Dev. tools',
              value: 'Node.js, Eris, MongoDB',
              inline: true,
            },
            {
              name: 'Uptime',
              value: this.client.utils.time.format(this.client.uptime),
              inline: true,
            },
            {
              name: 'Current shard',
              value: `#${interaction.member.guild.shard.id}`,
              inline: true,
            },
            {
              name: 'RAM usage',
              value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
              )} MB`,
              inline: true,
            },
            {
              name: 'Guilds',
              value: this.client.guilds.size,
              inline: true,
            },
          ],
        },
      ],
    });
  }
};
