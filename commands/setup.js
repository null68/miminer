const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'setup',
      description: 'Setup the channel for mine',
      options: [
        {
          name: 'channel',
          description: 'The channel to setup',
          type: 7,
          required: true,
        },
      ],
    });
  }
  async init(interaction) {
    if (!interaction.member.permissions.has('manageChannels'))
      return interaction.createMessage({
        embeds: [
          {
            description: `You don't have permission to use this command!`,
            color: 0xff0000,
          },
        ],
        flags: 64,
      });

    let channelValue = interaction.data.options[0].value;
    let channel = interaction.channel.guild.channels.get(channelValue);
    if (channel.type != 0) {
      return interaction.createMessage({
        embeds: [
          {
            color: 0xff0000,
            description: 'The channel is not a text channel',
          },
        ],
        flags: 64,
      });
    }
    let guild = await this.client.utils.guild.getGuild(
      interaction.channel.guild.id
    );
    guild.channel = channel.id;
    await guild.save();
    return interaction.createMessage({
      embeds: [
        {
          color: 0x1e8449,
          description: 'The channel has been setup',
        },
      ],
    });
  }
};
