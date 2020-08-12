const express = require("express");
const router = express.Router();
const URLRand = require("../models/RandURL");
const RandURL = require("../models/RandURL");

router.post("/", async (req, res) => {
  try {
    const longurl = await URLRand.find({ longurl: req.body.longurl });
    if (longurl.length > 0) {
      res.json(longurl[0]);
      return;
    }
  } catch (err) {
    console.log(err);
  }
  const elem = new URLRand({
    longurl: req.body.longurl,
    shorturl: "11",
  });
  try {
    const savedURL = await elem.save();
    res.json(savedURL);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
