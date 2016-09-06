var credentials = require('../../credentials');

var options = {
  host: 'webservices.amazon.es',
  version: '2011-08-01'
};

var client;

var Item = function(data){
  this.asin = data.ASIN,
  this.description = data.ItemAttributes.Title
  if (data.OfferSummary.LowestNewPrice) {
    this.price = data.OfferSummary.LowestNewPrice.Amount;
    this.currency = data.OfferSummary.LowestNewPrice.CurrencyCode;
  }
  this.formattedPrice = (this.price / 100) + ' ' + this.currency;
};

function init(aws) {
  client = aws.createProdAdvClient(credentials.accessKey,
    credentials.secretAccessKey,
    credentials.asssociateTag,
    options);
}

function get(ASIN, callback) {
  var query = {
    ItemId: ASIN,
    IdType: 'ASIN'
  };
  client.call('ItemLookup', query, function(res) {
    return callback(null, new Item(res.Items.Item));
  });
}


function search(index, search, page, callback) {
  var query = {
    SearchIndex: index,
    Keywords: search,
    ItemPage: page
  };

  client.call('ItemSearch', query, function(result) {
    if (!result.Items) {
      return callback('Not Found');
    }

    return callback(null, {
      totalPages: parseInt(result.Items.TotalPages, 10),
      items: getItemAttributes(result.Items.Item)
    });
  });
}

function getItemAttributes(items) {
  var list = [];

  items.forEach(function(data) {
    list.push(new Item(data));
  });

  return list;
}


module.exports = {
  init: init,
  search: search,
  get: get
};
