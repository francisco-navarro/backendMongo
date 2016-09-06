var mongoose = require('mongoose');
require('./models/Users');
require('./models/Items');
var db = {
	User : mongoose.model('User'),
	Item : mongoose.model('Item')
};
var mongoip = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
	mongoport = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017',
	mongoauth = mongoip === 'localhost' ? '' : 'admin:dvJQ4FJ3cm7G@',
	dbname = 'amazon';

	mongoose.connect('mongodb://'+mongoauth+mongoip+':'+mongoport+'/'+dbname);

module.exports = db;
