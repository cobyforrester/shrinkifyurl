const mongoose = require("mongoose");

const IncrURLSchema = mongoose.Schema({
  shorturl: { type: String, required: true },
  longurl: { type: String, required: true },
});

module.exports = mongoose.model("IncrURL", IncrURLSchema);
