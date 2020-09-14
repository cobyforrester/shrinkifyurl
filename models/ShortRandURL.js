const mongoose = require("mongoose");

const ShortRandURLSchema = mongoose.Schema({
  shorturl: { type: String, required: true },
  longurl: { type: String, required: true },
});

module.exports = mongoose.model("ShortRandURL", ShortRandURLSchema);
