module.exports = class Event {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.type = options.type || 'on';
  }
  async init() {
    this.client.utils.logger.warn('Event ' + this.name + ' is not implemented');
  }
};
