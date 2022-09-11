const path = require('path');
const fs = require('fs');

module.exports = async function loadCommands(client) {
  const files = fs.readdirSync(path.join(__dirname, '../../commands'));
  for (const file of files) {
    const command = new (await require(`../../commands/${file}`))(client);
    client.commands.set(command.options.name, command);
    client.createCommand(command.options);
  }
  client.utils.logger.info('Loaded commands!');
};
