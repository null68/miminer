const User = require('../models/User');
const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'user' });
  }
  async newminer(userID) {
    let user = await this.getdb(userID);
    if (!user) {
      await User.create({
        id: userID,
        pickaxes: [{ pickaxe: 'wood', durability: 59 }],
      });
      return true;
    }
    return false;
  }
  async getdb(userID) {
    return (await User.findOne({ id: userID })) || false;
  }
  async set(userID, key, value) {
    const user = await this.getdb(userID);
    user[key] = value;
    await user.save();
  }
  async add(userID, key, value) {
    const user = await this.getdb(userID);
    user[key] += value;
    await user.save();
  }
};
