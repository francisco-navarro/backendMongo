var apn  = require("apn");
var path = require('path');
var winston = require('winston');
var credentials = require('../../credentials');

var apnError = function(err){
    console.log("APN Error:", err);
}

var options = {
    "production": false,
    "cert": process.env.HOME + "/Developer/salva_certs/cert.pem",
    "key": process.env.HOME + "/Developer/salva_certs/key.pem",
    "passphrase": credentials.passphrase,
    "gateway": "gateway.sandbox.push.apple.com",
    "port": 2195,
    "enhanced": true,
    "cacheLength": 5
  };
options.errorCallback = apnError;

var feedBackOptions = {
    "batchFeedback": true,
    "interval": 300
};

var apnConnection, feedback;
var filename = path.join(__dirname, 'created-logfile.log');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: filename })
  ]
});

function send(params) {
  var myDevice, note;
  
  myDevice = new apn.Device(params.token);
  note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 1;
  note.sound = "ping.aiff";
  note.alert = params.message;
  note.payload = {'messageFrom': params.from};

  if(apnConnection) {
    apnConnection.pushNotification(note, myDevice);
  }
}

function init() {
  apnConnection = new apn.Connection(options);

  /*feedback = new apn.Feedback(feedBackOptions);
  feedback.on("feedback", function(devices) {
      devices.forEach(function(item) {
          //TODO Do something with item.device and item.time;
      });
  });*/
}

function mock(params){
	logger.log('info', params.message, { 'target': params.token });
	console.warn('NOTIFICACION ENVIADA A: ', params.token + ' ' + params.message);
}

module.exports = {
	init: init,
	send: send // cambiar por mock si se quiere log en vez de notificaciones
};
