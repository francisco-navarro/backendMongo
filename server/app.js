var express = require('express');
var bodyParser = require('body-parser');
var itemController = require('./controllers/item.controller');

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/items', itemController.get);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
