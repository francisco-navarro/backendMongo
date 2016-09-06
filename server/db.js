var mongoose = require('mongoose');
require('./models/Users');
require('./models/Items');
var db = {
	User : mongoose.model('User'),
	Item : mongoose.model('Item')
};
var mongoip = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
	mongoport = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017',
	mongoauth = mongoip === 'localhost' ? '' : 'admin:6PirN1GSpzB3',
	dbname = mongoip === 'localhost' ? 'amazon' : 'pako';

	mongoose.connect('mongodb://'+mongoauth+mongoip+':'+mongoport+'/'+dbname);

module.exports = db;
