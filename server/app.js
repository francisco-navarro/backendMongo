var express = require('express');
var bodyParser = require('body-parser');
var cron = require('node-cron');
// var db = require('./db');
var itemController = require('./controllers/item.controller')();
var app = express();
var fs = require('fs');
var path = require('path');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('It works');
});

// app.get('/items', itemController.search);

app.get('/items', itemController.get);

app.get('/users', function(req, res, next) {
  db.User.find({}, function(err, users){
    if (err){
      return next(err);
    }

    return res.json(users);
  });
});

app.param('user', function(req, res, next, id) {
  var query = db.User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});

app.get('/users/:user', function(req, res, next) {
  db.User.findOne({'_id': req.params.user}, function(err, user){
    if(err || !user){ return next(err);}
    req.user.populate(['items'], function(err, user) {
      if (err) { return next(err); }
      res.json(user);
    });
  });
});

app.get('/log', function(req, res, next) {
  fs.readFile(path.join(__dirname, '/services/created-logfile.log'), 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    res.send(data);
  });
});

app.listen(server_port, server_ip_address, function() {
  console.log('App listening on port ' + server_port);
});

cron.schedule('0 0 * * * *', itemController.watchPrices);
