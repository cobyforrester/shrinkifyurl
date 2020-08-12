const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

//CONNECT TO DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => console.log("DB Connected!"))
  .catch((err) => {
    console.log(err);
  });

//ROUTES
const incrShortenURL = require("./routes/incrShorteningURL");
const randShortenURL = require("./routes/randShorteningURL");
const homeRoute = require("./routes/home");

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/incr", incrShortenURL);
app.use("/api/rand", randShortenURL);
app.use("/", homeRoute);

//START SERVER
app.listen(8080);
