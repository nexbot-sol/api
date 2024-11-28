const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  toPublicKey: { type: String, required: true },
  amount: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
