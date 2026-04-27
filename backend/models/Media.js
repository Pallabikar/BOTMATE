const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  format: String,
  resource_type: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
