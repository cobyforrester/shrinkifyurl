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
    shorturl: createShortenedURL(req.body.longurl),
  });
  try {
    const savedURL = await elem.save();
    res.json(savedURL);
  } catch (err) {
    res.json(err);
  }
});

const createShortenedURL = (longurl) => {
  let shorturl = createHash(longurl);
  return shorturl;
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
    //calculates number of chars it will be
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
  let total = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let mapOfChars = {};
  for (let i = 0; i < total.length; i++) {
    mapOfChars[i] = total[i];
  }
  return mapOfChars;
};

/*
for i in range(n):
p = n - i - 1
if pow(62, p) <= varId:
    mult = 1
    while mult * pow(62, p) < varId:
        mult += 1
    mult -= 1
    varId -= mult * pow(62, p)
    strFnl += mapChars[mult]
else:
    strFnl += "0"
return strFnl
def mapCharsDic():
lAlph = 'abcdefghijklmnopqrstuvwxyz'
uAlph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
nums = '0123456789'
total = nums+lAlph+uAlph
mapChars = {}
for i, val in enumerate(total):
mapChars[i] = val
return mapChars
*/

module.exports = router;
