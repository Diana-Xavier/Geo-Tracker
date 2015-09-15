var express = require('express');  
var app = express();  
var httpServer = require("http").createServer(app);  
var io = require('socket.io')(httpServer);
var port = 3000; 
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port); 

io.listen(httpServer).on('connection', function (socket) {
	console.log('Client connected...');
    socket.on('switch', function(data) {
        console.log("location");
		 socket.emit('data',"13.0905,80.2843962");
		/*if(data === "on"){
			serialPort.write(data + 1);
		}else if(data === "off"){
			serialPort.write(data + 0);
		}*/
    });
	
   /* serialPort.on('data', function(data) {  
      
    });  */

});