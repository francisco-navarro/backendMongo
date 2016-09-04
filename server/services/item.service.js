var credentials = require('../../credentials');

var options = {
  host: 'webservices.amazon.es',
  version: '2011-08-01'
};

var client;

function init(aws) {
  console.log('Configuring AWS server...');

  client = aws.createProdAdvClient(credentials.accessKey,
    credentials.secretAccessKey,
    credentials.asssociateTag,
    options);
}


function search(index, search, page, callback) {
  console.log('search petition');
  client.call("ItemSearch", {
    SearchIndex: index,
    Keywords: search,
    ItemPage: page
  }, function(err, result) {
    if (err) {
      return callback(err);
    }
    if (!result.Items) {
      return callback('Not Found');
    }

    return callback(null, result.Items);
  });
}



module.exports = {
  init: init,
  search: search
};
