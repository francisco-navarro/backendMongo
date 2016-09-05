var aws = require('aws-item-lib');
var itemService = require('./../services/item.service');

var req = itemService.init(aws);

function get(req, res) {
  var page = req.query.page || 1;
  if (!req.query.filter) {
    res.status(209).end();
  } else {
    itemService.search('All', req.query.filter, page,
      function(err, response) {
        res.json(response);
        res.status(200).end();
      });
  }
}

module.exports = {
  get: get
};
