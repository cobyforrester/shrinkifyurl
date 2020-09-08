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
const randShortenURL = require("./routes/randShorteningURL");
const homeRoute = require("./routes/home");
const redirectRoute = require("./routes/redirect");

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/rand", randShortenURL);
app.use("/", homeRoute);
app.use(redirectRoute); //default for the shortened urls

//START SERVER
const port = process.env.PORT || 8080;
app.listen(port);
server.keepAliveTimeout = 75000;
