const Event = require('../structures/cores/event');

module.exports = class extends Event {
  constructor(client) {
    super(client, { name: 'error' });
  }
  async init(error, id) {
    this.client.utils.logger.error('Error on shard #' + id + ': ' + error);
  }
};
