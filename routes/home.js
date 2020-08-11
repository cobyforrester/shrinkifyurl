const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1 style='text-align:center;color:grey;'>HOME PAGE YEAH</h1>");
});

module.exports = router;
