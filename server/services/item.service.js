var credentials = require('../../credentials');

var options = {
  host: 'webservices.amazon.es',
  version: '2011-08-01'
};

var client;

function init(aws) {

  client = aws.createProdAdvClient(credentials.accessKey,
    credentials.secretAccessKey,
    credentials.asssociateTag,
    options);
}

function get() {
  //TODO
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

  items.forEach(function(item) {
    var parsed = {
      id: item.ASIN,
      title: item.ItemAttributes.Title
    };
    if (item.OfferSummary.LowestNewPrice) {
      parsed.price = item.OfferSummary.LowestNewPrice.FormattedPrice;
    }
    list.push(parsed);
  });

  return list;
}


module.exports = {
  init: init,
  search: search,
  get: get
};
