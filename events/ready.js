const Event = require('../structures/cores/event');
const loadCommands = require('../structures/handlers/commands');
module.exports = class extends Event {
  constructor(client) {
    super(client, { name: 'ready', type: 'once' });
  }
  async init() {
    await loadCommands(this.client);
    await this.client.utils.logger.info(
      'Ready!' +
        ' - ' +
        'Shards: ' +
        this.client.shards.size +
        ' - ' +
        'Guilds: ' +
        this.client.guilds.size
    );
    this.client.editStatus('online', {
      name: '/help | ' + this.client.guilds.size + ' guilds',
      type: 3,
    });
  }
};
