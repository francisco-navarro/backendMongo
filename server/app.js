var express = require('express');
var bodyParser = require('body-parser');
var itemController = require('./controllers/item.controller');
var db = require('./db');

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('It works');
});

// app.get('/items', itemController.search);

app.get('/items', itemController.get);

app.get('/users', function(req, res, next) {
  db.User.find({}, function(err, users){
    if(err){ return next(err); }
    res.json(users);
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

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
