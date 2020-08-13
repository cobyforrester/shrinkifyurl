const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const RandURL = require("../models/RandURL");

router.post("/", async (req, res) => {
  try {
    const longurl = await RandURL.find({ longurl: req.body.longurl });
    if (longurl.length > 0) {
      res.json(longurl[0]);
      return;
    }
  } catch (err) {
    console.log(err);
  }
  const elem = new RandURL({
    longurl: req.body.longurl,
    shorturl: createShortenedURL(req.body.longurl, 5),
  });
  try {
    const savedURL = await elem.save();
    res.json(savedURL);
  } catch (err) {
    res.json(err);
  }
});

const createShortenedURL = (longurl, n) => {
  let hash = crypto.createHash("sha256").update(longurl).digest("Base64");
  hash = hash.slice(0, hash.length - 1);
  let shorturl = hash.slice(0, n);
  let shorturlFnl = "";
  for (let i = 0; i < shorturl.length; i++) {
    if (shorturl[i] === "+") shorturlFnl += "-";
    else if (shorturl[i] === "/") shorturlFnl += "_";
    else shorturlFnl += shorturl[i];
  }
  return shorturlFnl;
};

module.exports = router;
