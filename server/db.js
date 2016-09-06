var mongoose = require('mongoose');
require('./models/Users');
require('./models/Items');
var db = {
	User : mongoose.model('User'),
	Item : mongoose.model('Item')
};

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/amazon';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

	mongoose.connect('mongodb://' + connection_string);

module.exports = db;
