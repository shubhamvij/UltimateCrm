const express = require('express');
const app = express();
const env = require("./config/env");
var bodyParser = require('body-parser');
var models = require('./models');

app.use((req, res, next) => {
  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

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
