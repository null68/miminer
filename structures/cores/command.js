module.exports = class Command {
  constructor(client, options) {
    this.client = client;
    this.options = options;
  }
  async init(interaction) {
    interaction.createMessage('This command is not implemented');
    this.client.utils.logger.warn(
      'Command ' + this.options.name + ' is not implemented'
    );
  }
};
