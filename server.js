 var express = require('express');
 var app = express();
 var server = require('http').createServer(app);
 var io = require('socket.io').listen(server);
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