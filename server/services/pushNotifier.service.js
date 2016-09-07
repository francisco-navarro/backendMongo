
var path = require('path'),
    winston = require('winston');

var filename = path.join(__dirname, 'created-logfile.log');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: filename })
  ]
});

function send(msg, target){
	logger.log('info', msg, { 'target': target });
	console.warn('NOTIFICACION ENVIADA A: ', target + ' ' + msg);
}

module.exports = {
	send: send
};
