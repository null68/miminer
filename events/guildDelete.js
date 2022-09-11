const Event = require('../structures/cores/event');

module.exports = class extends Event {
  constructor(client) {
    super(client, { name: 'guildDelete' });
  }
  async init(guild) {
    await this.client.utils.guild.deleteGuild(guild.id);
    await this.client.utils.logger.info(
      `Left guild ${guild.name} (${guild.id})`
    );
  }
};
