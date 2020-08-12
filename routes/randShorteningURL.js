const express = require("express");
const router = express.Router();
const URLRand = require("../models/RandURL");
const RandURL = require("../models/RandURL");

router.post("/", async (req, res) => {
  const elem = new RandURL({
    longurl: req.body.longurl,
    shorturl: "abcdef",
  });
  try {
    const savedURL = await elem.save();
    res.json(savedURL);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
