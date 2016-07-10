//add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

 var express = require('express');
 var app = express();
 var server = require('http').createServer(app);
 var io = require('socket.io').listen(server);

//since logger only returns a UTC version of date, I'm defining my own date format - using an internal module from console-stamp
var logger = require('morgan');

logger.format('mydate', function() {
    var df = require('console-stamp/node_modules/dateformat');
    return df(new Date(), 'HH:MM:ss.l');
});
app.use(logger('[:mydate] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));

 users = [];
 connections =[];

 server.listen(3000);
 console.log("server running ...");

 app.get('/', function(req, res){
 	res.sendFile(__dirname + '/index.html');
 });

 io.sockets.on('connection', function(socket) {
 	connections.push(socket);
 	console.log("new connection");
 	console.log('connected: %s sockets', connections.length);
     
    // Disconeect
    socket.on('disconnect', function(data){
    	connections.splice(connections.indexOf(socket),1);
    	console.log('Disconnection');
    	console.log('connected: %s sockets', connections.length);
    }); 

  });