const express = require("express");
const router = express.Router();

const RandURL = require("../models/RandURL");

router.get("*", async (req, res) => {
  try {
    let url = req.url.slice(1, req.url.length);
    const results = await RandURL.find({ shorturl: url });
    if (results.length > 0) {
      res.redirect(results[0].longurl);
    } else {
      res.json();
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
