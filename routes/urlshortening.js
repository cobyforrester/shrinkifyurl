const express = require("express");

const router = express.Router();

router.post("/rand", (req, res) => {
  res.send("We are on randurl");
});

router.post("/incr", (req, res) => {
  res.send(`We are on incr`);
});

module.exports = router;
