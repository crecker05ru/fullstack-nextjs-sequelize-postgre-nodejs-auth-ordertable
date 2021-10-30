// var app = express();
// var expressWs = require('express-ws')(app);

// var index = require('./routes/index');
// var ws = require('./routes/ws');

// app.use('/ws', ws);
// app.use('/*', index);

var app = express();
var server = require('http').Server(app);
var expressWs = require('express-ws')(app,server);


//module.exports = app;
module.exports = {app: app,server: server};