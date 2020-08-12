const mongoose = require("mongoose");

const RandURLSchema = mongoose.Schema({
  shorturl: { type: String, required: true },
  longurl: { type: String, required: true },
});

module.exports = mongoose.model("RandURL", RandURLSchema);
