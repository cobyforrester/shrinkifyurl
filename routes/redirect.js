const express = require("express");
const router = express.Router();

const RandURL = require("../models/RandURL");

router.get("*", async (req, res) => {
  console.log("IN REDIRECT");
  try {
    let url = req.url.slice(1, req.url.length);
    const urlQs = await RandURL.findOne({ shorturl: url });
    if (urlQs) {
      let longurl = urlQs.longurl;
      let http = longurl.slice(0, 7);
      let https = longurl.slice(0, 8);
      if (https !== "https://" && http !== "http://") {
        longurl = "http://" + longurl;
      }
      res.status(302).redirect(longurl);
    } else {
      res.send(
        "<h1 style='text-align:center; margin-top: 20px;'>Page Not Found</h1>"
      );
    }
  } catch (err) {
    console.log(err);
    res.send(
      "<h1 style='text-align:center; margin-top: 20px;'>An Error Occurred</h1>"
    );
  }
});

module.exports = router;
