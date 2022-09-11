const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Cooldown',
  new mongoose.Schema({
    type: {
      type: String,
    },
    owner: {
      type: String,
    },
    expiresAt: {
      type: Number,
    },
  })
);
