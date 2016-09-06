//Amazon Product Advertising API
var aws = require('aws-item-lib');
var itemService = require('./../services/item.service');
var pushNotifier = require('./../services/pushNotifier.service');
var successCode = 200;
var almostSuccessCode = 209;
var db = require('./../db');

var dbItems;

function init(db){
  // dbItems = db;
  itemService.init(aws);

  return {
    get: get,
    search: search,
    update: update,
    watchPrices: watchPrices
  }
}

function search(req, res) {
  var page = req.query.page || 1;

  if (req.query.filter) {
    itemService.search('All', req.query.filter, page,
    function(err, response) {
      res.json(response);
      res.status(successCode).end();
    });
  } else {
    res.status(almostSuccessCode).end();
  }
}

function get(request, response){
  var asin = request.query.asin;

  itemService.get(asin, function(err, result){
    response.json(result);
    response.status(successCode).end();
  });
}

function update(item){
  itemService.get(item.asin, function(err, result){
    if(item.price !== parseInt(result.price, 10)){
      pushNotifier.send(item, result);
      item.price = parseInt(result.price, 10);
      item.save(function(err, item2){
        if(err){
          console.error(err);
        }
      });
    }
  });
}

function watchPrices() {
  console.log('Consultando precios...');
  db.Item.find({}, function(err, items){
    if (err){
      throw err;
    }
    items.forEach(function(item) {
      update(item);
    });
  });
  console.log('Consulta terminada');
}

module.exports = init;
