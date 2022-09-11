const { default: mongoose } = require('mongoose');

module.exports = mongoose.model(
  'guild',
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      default: null,
    },
  })
);
