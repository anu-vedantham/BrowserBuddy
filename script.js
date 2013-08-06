var isAlive = 1;
var isGrey = 0;
var buddySrc = "testing.png"; 

function updateGreyScale(img, newVal){
	flushDataAttributes(img);
	placeReferenceImage(img, buddySrc, img);
	addAttribute(img, "data-pb-greyscale-opacity", newVal);
	processFilters();
}

$(document).ready(function() {
	/* Buttons for testing
	   op_down decreases opacity by 0.1 till opacity is 0
	   if <0.1, target is considered dead and is red
	   op_up increases opacity by 0.1 regardless of status
	*/
	var incr = 0.1;
	$("#op_down").click(function(){
		strOp = $('#fadeOut').css('opacity');
		currOp = parseFloat(strOp);
		/*$("#fade2black").css("background-color","#00CC00");*/
		if ((currOp-incr >= 0)){
			newOp = currOp-incr;
			$("#fadeOut").css("opacity",newOp);
		}
		/*else
			isDead = 1;*/
	});
	$("#op_up").click(function(){
		strOp = $('#fadeOut').css('opacity');
		currOp = parseFloat(strOp);
		//isDead = 0;		
		if ((currOp+incr <= 1)){
			newOp = currOp+incr;
			$("#fadeOut").css("opacity",newOp);
		}
	});
	$("#sat_up").click(function() {
		//Saturation up = Greyscale down
		strGr = $('#fadeOut').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		//isGrey = 0;
		if (currGr-incr >= 0){
			img = $("#fadeOut")[0];
			newGr = currGr-0.1;
			updateGreyScale(img, newGr);
		}
		
	});
	$("#sat_down").click(function() {
		//Saturation down = Greyscale up
		strGr = $('#fadeOut').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		if (currGr < 1 && !isGrey){
			newGr = currGr+0.1;
			img = $("#fadeOut")[0];
			updateGreyScale(img, newGr);
		}
		/*else{
			isGrey = 1;
		}*/
	});


});