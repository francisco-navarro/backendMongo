var aws = require('aws-lib');
var credentials = require('../credentials');

console.log('starting...');

var prodAdv = aws.createProdAdvClient(credentials.accessKey,
    credentials.secretAccessKey,
    credentials.asssociateTag,
    {
    host: 'webservices.amazon.es',
    version: '2011-08-01'
  });

prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
  console.log(JSON.stringify(result));
});
