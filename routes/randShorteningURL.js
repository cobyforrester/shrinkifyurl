const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const RandURL = require("../models/RandURL");

router.post("/", async (req, res) => {
  console.log("RAND REQUEST", req.body);
  try {
    const urlItem = await RandURL.findOne({ longurl: req.body.longurl });
    if (urlItem) {
      res.json(urlItem);
      return;
    }
  } catch (err) {
    console.log(err);
  }
  let longurl = req.body.longurl;
  let n = 7;
  let shorturl = await createShortenedURL(longurl, n);
  const elem = new RandURL({
    longurl: longurl,
    shorturl: shorturl,
  });
  let isAdded = false;
  while (1) {
    try {
      const savedURL = await elem.save();
      isAdded = false;
      res.json(savedURL);
      return;
    } catch (err) {
      console.log("It failed");
      elem.shorturl = await createShortenedURL(longurl, 5);
    }
  }
});

const createShortenedURL = async (longurl, n) => {
  let shorturl = createHash(longurl);
  let shorturlFnl = shorturl.slice(shorturl.length - n, shorturl.length);
  let urlItem = await RandURL.findOne({ shorturl: shorturlFnl });
  while (urlItem) {
    n += 1;
    shorturlFnl = shorturl.slice(shorturl.length - n, shorturl.length);
    urlItem = await RandURL.findOne({ shorturl: shorturlFnl });
  }
  return shorturlFnl;
};

const generateHashAsInt = (longurl) => {
  //GENERATES HASH NUMBER AS INT
  return parseInt(crypto.createHash("sha1").update(longurl).digest("hex"), 16);
};

const createHash = (longurl) => {
  let hash = generateHashAsInt(longurl);
  let mapOfChars = mapChars();
  let n = 1;
  let strFnl = "";

  while (Math.pow(62, n) < hash) {
    //calculates number of chars it will be so no padded values and no missing
    n += 1;
  }
  for (let i = 0; i < n; i++) {
    let numPow = n - i - 1; //calculating left to right base 62 rep
    let calcPow = Math.pow(62, numPow);
    if (calcPow <= hash) {
      let mult = 1;
      while (mult * calcPow < hash) {
        mult += 1;
      }
      mult -= 1;
      hash -= mult * calcPow;
      strFnl += mapOfChars[mult];
    } else {
      strFnl += mapOfChars[0];
    }
  }
  return strFnl;
};

const mapChars = () => {
  let total = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let mapOfChars = {};
  for (let i = 0; i < total.length; i++) {
    mapOfChars[i] = total[i];
  }
  return mapOfChars;
};

module.exports = router;
