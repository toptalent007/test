const mongoose = require("mongoose");

const payloadSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payload", payloadSchema);
