var aws = require('aws-lib');
var itemService = require('./services/item.service.js');

itemService.init(aws);
