const Guild = require('../models/Guild');
const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'guild' });
  }
  async createGuild(id) {
    return await Guild.create({ id: id });
  }
  async getGuild(id) {
    return (
      (await Guild.findOne({ id: id })) || (await Guild.create({ id: id }))
    );
  }
  async deleteGuild(id) {
    return await Guild.deleteOne({ id: id });
  }
};
