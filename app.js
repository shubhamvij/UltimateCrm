const express = require('express')
const app = express()
var models = require('./models');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Relations being managed on port 3000')
})
