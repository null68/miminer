const Command = require('../structures/cores/command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'givedonatorpickaxe',
      description: 'Gives you a donator pickaxe',
      options: [
        {
          name: 'user',
          description:
            'The user to give the donator pickaxe to (developer only)',
          type: 6,
          required: true,
        },
      ],
    });
  }
  async init(interaction) {
    if (!this.client.config.admins.includes(interaction.member.id)) {
      return interaction.createMessage({
        embeds: [
          {
            title: 'Error',
            color: 0xe74c3c,
            description: 'You do not have permission to use this command',
          },
        ],
        flags: 64,
      });
    }
    let user = interaction.data.options[0].value;
    let userdb = await this.client.utils.user.getdb(user);
    if (!userdb)
      return interaction.createMessage({
        embeds: [
          {
            title: 'Error',
            color: 0xe74c3c,
            description: 'That user does not have an inventory',
          },
        ],
        flags: 64,
      });
    if (userdb.pickaxes.find(x => x.pickaxe == 'donator'))
      return interaction.createMessage({
        embeds: [
          {
            title: 'Error',
            color: 0xe74c3c,
            description: 'That user already has a donator pickaxe',
          },
        ],
        flags: 64,
      });
    userdb.pickaxes.push({
      pickaxe: 'donator',
      durability: this.client.config.pickaxeData.donator.maxDurability,
    });
    await userdb.save();
    this.client.utils.logger.info('Gave donator pickaxe to user ' + user);
    return interaction.createMessage({
      embeds: [
        {
          title: 'Success',
          color: 0x2ecc71,
          description: `You have given <@${user}> a donator pickaxe`,
        },
      ],
    });
  }
};
