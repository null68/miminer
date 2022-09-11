const path = require('path');
const fs = require('fs');
module.exports = async function loadEvents(client) {
  const files = fs.readdirSync(path.join(__dirname, '../../events'));
  for (const file of files) {
    const event = new (await require(`../../events/${file}`))(client);
    event.type == 'on'
      ? client.on(event.name, async (...args) => event.init(...args))
      : client.once(event.name, async (...args) => event.init(...args));
  }
  client.utils.logger.info('Loaded events!');
};
