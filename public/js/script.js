$( document ).ready(function() {
console.log("hello");		
	var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
		$('#flipBtn').on('change', function (event) {
			console.log($("#flipBtn").val());
			var btnStatus = $("#flipBtn").val();
			if(btnStatus === "on"){
				socket.emit('switch', 'on');
			}else if(btnStatus === "off"){
				socket.emit('switch', 'off');
			}
		});
    });
	
	socket.on('data', function(data) {
		var result = data.trim();
		console.log("result"+result);
		if(result === '1'){
			$('#status').html("Light is ON");
		}else if(result === '0'){
			$('#status').html("Light is OFF");
		}
    });
});