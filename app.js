const express = require('express');
const app = express();
const env = require("./config/env");
var bodyParser = require('body-parser');
var models = require('./models');
var frontend = require('./frontend/ultimatecrm/src/App')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes')(app); // Load all routes

var port = process.env.API_PORT || 3000;

app.listen(port, function () {
  console.log("Relations being managed on port 3000");
  console.log("--------------");
})

console.log("Loaded Environment Information:");
console.log(env);
console.log("--------------");
