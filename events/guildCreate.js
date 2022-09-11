const Event = require('../structures/cores/event');

module.exports = class extends Event {
  constructor(client) {
    super(client, { name: 'guildCreate' });
  }
  async init(guild) {
    await this.client.utils.guild.createGuild(guild.id);
    await this.client.utils.logger.info(
      `Joined guild ${guild.name} (${guild.id})`
    );
  }
};
