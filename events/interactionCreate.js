const { CommandInteraction } = require('eris');
const Event = require('../structures/cores/event');

module.exports = class extends Event {
  constructor(client) {
    super(client, { name: 'interactionCreate' });
    this.perms = ['viewChannel', 'sendMessages', 'useExternalEmojis'];
  }
  async init(interaction) {
    let missingPerms = [];
    for (let perm of this.perms) {
      if (!interaction.channel.permissionsOf(this.client.user.id).has(perm)) {
        missingPerms.push(this.formatPermission(perm));
      }
    }
    if (missingPerms.length > 0) {
      return interaction
        .createMessage({
          embeds: [
            {
              title: 'Error',
              color: 0xe74c3c,
              description: `I am missing the following permissions: ${missingPerms.join(
                ', '
              )}`,
            },
          ],
        })
        .catch(embedSendError => {
          interaction
            .createMessage(
              'I am missing the following permissions: ' +
                missingPerms.join(', ')
            )
            .catch(sendError => {
              this.client.utils.logger.error(
                'Error sending missing permissions message: ' + sendError
              );
            });
        });
    }
    if (interaction instanceof CommandInteraction) {
      if (this.client.commands.has(interaction.data.name)) {
        try {
          const command = this.client.commands.get(interaction.data.name);
          let guildData = await this.client.utils.guild.getGuild(
            interaction.channel.guild.id
          );
          if (
            command.options.name != 'setup' &&
            interaction.channel.id != guildData.channel
          ) {
            if (guildData.channel == null)
              return interaction.createMessage({
                embeds: [
                  {
                    color: 0xff0000,
                    description:
                      'The channel has not been setup yet. Please use `/setup` to setup the channel',
                  },
                ],
              });
            return interaction.createMessage({
              embeds: [
                {
                  color: 0xff0000,
                  description:
                    'You can only use this command in the <#' +
                    guildData.channel +
                    '>',
                },
              ],
              flags: 64,
            });
          }
          command.init(interaction);
        } catch (err) {
          this.client.utils.logger.error(err);
        }
      }
    } else {
      await this.client.utils.logger.error(
        'Interaction is not a CommandInteraction',
        interaction
      );
      return;
    }
  }
  formatPermission(permission) {
    const result = permission.split(/(?=[A-Z])/).join(' ');

    return result.charAt(0).toUpperCase() + result.slice(1);
  }
};
