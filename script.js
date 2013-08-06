var isAlive = 1;

$(document).ready(function() {
	/* Buttons for testing
	   op_down decreases opacity by 0.1 till opacity is 0
	   if <0.1, target is considered dead and is red
	   op_up increases opacity by 0.1 regardless of status
	*/
	$("#op_down").click(function(){
		currOp = $('#fade2black').css('opacity');
		/*$("#fade2black").css("background-color","#00CC00");*/
		if ((currOp > 0.1) && isAlive){
			newOp = parseFloat(currOp)-0.1;
			$("#fade2black").css("opacity",newOp);
		}
		else{
			$("#fade2black").css("opacity",1);
			$("#fade2black").css("background-color","#CC0000");
			isAlive = 0;
		}
	});
	$("#op_up").click(function(){
		currOp = $('#fade2black').css('opacity');
		/*$("#fade2black").css("background-color","#0000CC");*/
		if(!isAlive){
			isAlive = 1;
			$("#fade2black").css("background-color","#000000");
		}
		
		if ((currOp < 1)){
			newOp = parseFloat(currOp)+0.1;
			$("#fade2black").css("opacity",newOp);
		}
	});


});