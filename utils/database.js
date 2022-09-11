const mongoose = require('mongoose');
const Util = require('../structures/cores/util');

module.exports = class extends Util {
  constructor(client) {
    super(client, { name: 'database' });
  }
  async connect() {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.utils.logger.info('Connected to database!');
  }
};
