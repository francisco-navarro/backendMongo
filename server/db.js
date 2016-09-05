var client = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';
var data;

client.connect(url, function(err, db) {
  data = db;
});

function collection(name) {
  return data.name;
}

module.exports = {
  collection: collection
};
