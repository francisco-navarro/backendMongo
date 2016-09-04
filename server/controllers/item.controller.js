var aws = require('aws-lib');
var itemService = require('./../services/item.service');

var req = itemService.init(aws);

function get(req, res) {
	if(!req.query.filter){
		res.status(209).end();
	} else{
		itemService.search('All', req.query.filter, 1, function(err, response){
			res.json(response);
			res.status(200).end();
		});
	}
}

module.exports = {
	get: get
};
