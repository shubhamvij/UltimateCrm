const express = require('express');
const app = express();
const env = require("./config/env");
var models = require('./models');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log("Relations being managed on port 3000");
  console.log("--------------");
})

console.log("Loaded Environment Information:");
console.log(env);
console.log("--------------");

models.employee.findAll().then(admins => {
  console.log(`Found ${admins.length} matching records.`);
  console.log("--------------");
});
