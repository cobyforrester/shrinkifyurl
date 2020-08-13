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
const redirectRoute = require("./routes/redirect");

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/incr", incrShortenURL);
app.use("/api/rand", randShortenURL);
app.use("/", homeRoute);
app.use(redirectRoute); //default for the shortened urls

//START SERVER
app.listen(8080);
