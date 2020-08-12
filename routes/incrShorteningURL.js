const express = require("express");
const router = express.Router();
const URLRand = require("../models/IncrURL");

router.post("/", (req, res) => {
  res.send(`We are on incr`);
});

module.exports = router;
