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

function buildNotification(item, updatedItem, target) {
  var msg = 'Articulo ' + item.description;

  if(updatedItem.price < item.price){
    msg+=' ha bajado de precio.';
  } else {
    msg+=' ha subido de precio.';
  }
  msg+= ' Nuevo precio ' + updatedItem.formattedPrice;
  pushNotifier.send(msg, target);
}

function update(item, updatedItem) {
  item.price = parseInt(updatedItem.price, 10);
  item.save(function(err, item2){
    if(err){
      console.error(err);
    }
  });
}

function compare(item){
  itemService.get(item.asin, function(err, result){
    if(item.price !== parseInt(result.price, 10)){
      //Aqui se puede enviar el item.user.deviceToken en vez del username
      buildNotification(item, result, item.user.username);
      update(item, result);
    }
  });
}

function watchPrices() {
  console.log('Consultando precios...');
  db.Item.find({}).populate('user').exec(function(err, items){
    if (err){
      throw err;
    }
    items.forEach(function(item) {
      compare(item);
    });
  });
  console.log('Consulta terminada');
}

module.exports = init;
