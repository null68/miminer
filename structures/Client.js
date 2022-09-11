const { Client, Collection } = require('eris');
const loadUtils = require('./handlers/utils');
const loadEvents = require('./handlers/events');

module.exports = class extends Client {
  constructor() {
    super(process.env.TOKEN, {
      intents: [
        'guildIntegrations',
        'guilds',
        'guildMembers',
        'guildPresences',
      ],
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true,
        repliedUser: true,
      },
      autoreconnect: true,
      maxShards: 'auto',
      messageLimit: 0,
      largeThreshold: 0,
    });
    this.config = require('../store/index');
    this.utils = {};
    this.commands = new Collection();
  }
  async run() {
    await loadUtils(this);
    await this.connect();
    this.utils.database.connect();
    await loadEvents(this);
  }
};
