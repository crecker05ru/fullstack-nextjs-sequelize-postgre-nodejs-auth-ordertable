//ws.js
var express = require('express');
var router = express.Router();

var connections = {};
router.ws('/connect/', function (ws, req) {
    // console.log(ws);
    ws.on('close', function(x, y, z) {
        console.log(a, b, c);
    });
});

module.exports = router;


//app.js
var app = express();
var expressWs = require('express-ws')(app);

var index = require('./routes/index');
var ws = require('./routes/ws');

// ...
// ...

app.use('/ws', ws);
app.use('/*', index);

//bin/www - Generated by express generator

var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
server.listen(port);