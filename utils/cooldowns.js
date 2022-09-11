const Cooldown = require('../models/Cooldown');
const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, {
      name: 'cooldowns',
    });
  }
  async set(userID, type, expiresAt) {
    return Cooldown.create({
      type: type,
      owner: userID,
      expiresAt: expiresAt,
    });
  }
  async whenExpire(userID, type) {
    const cooldown = await Cooldown.findOne({
      type: type,
      owner: userID,
    });
    if (!cooldown) return false;
    return cooldown.expiresAt;
  }
  async hasRaw(userID, type) {
    const cooldown = await Cooldown.findOne({
      type: type,
      owner: userID,
    });
    if (!cooldown) return false;
    return true;
  }
  async remove(userID, type) {
    const cooldown = await Cooldown.findOne({
      owner: userID,
      type: type,
    });
    if (!cooldown) return false;
    await cooldown.remove();
    return true;
  }
  async has(userID, type) {
    const cooldown = await Cooldown.findOne({
      owner: userID,
      type: type,
    });
    if (!cooldown) return false;
    if (cooldown.expiresAt < Date.now()) {
      await cooldown.remove();
      return false;
    }
    return true;
  }
};
