// import express from 'express';
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const mongo = require("./credentials/mongo");

// Imports for Routes
const taskRoutes = require("./routes/routes");

const app = express();

mongoose
  .connect(mongo.remoteConnString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}))

app.get("/",(req, res) => {
    return res.end("home page");
})


app.listen(PORT, ()=> console.log(`server started at ${PORT} `))


module.exports = app;