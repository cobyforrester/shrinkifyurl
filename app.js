const express = require("express");
const mongoose = require("mongoose");
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
app.use("/shorten", urlRoutes);
app.use("/", homeRoute);

//START SERVER
app.listen(8080);
