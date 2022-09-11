const fs = require('fs');
const path = require('path');
module.exports = async function loadUtils(client) {
  const files = fs.readdirSync(path.join(__dirname, '../../utils'));
  for (const file of files) {
    const util = new (await require(`../../utils/${file}`))(client);
    client.utils[util.name] = util;
  }
};
