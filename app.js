const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("DB Connected!");
  }
);

//ROUTES
const urlRoutes = require("./routes/urlshortening");
const homeRoute = require("./routes/home");

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/shorten", urlRoutes);
app.use("/", homeRoute);

//START SERVER
app.listen(8080);
