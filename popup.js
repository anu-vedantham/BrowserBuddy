var buddySrc = "bunny_happy.png";

function updateGreyScale(newVal){
	img = $("#buddy")[0];
	flushDataAttributes(img);
	placeReferenceImage(img, buddySrc, img);
	addAttribute(img, "data-pb-greyscale-opacity", newVal);
	processFilters();
}

function getStoredValues(items){
	if (items != null && items !== undefined){
		stored = $.extend(true, {}, items);
		//set the opacity
		$("#buddy").css("opacity",items.opacity);
		buddySrc = items.expression;
		//set the greyscale
		updateGreyScale(items.greyscale);
		if (items.checked){
			$('#page').prop("checked", true);
		}
		else
			$('#page').prop("checked", false);

	}
	else
		console.log('WE HAVE A PROBLEM');
}

function changeExpression(op, gr){
	if (op >= 0.7 && gr <= 0.3) //[0.7,1] & [0, 0.3]
		buddySrc = "bunny_happy.png";
	else if(op < 0.5 && gr > 0.6) //[0, 0.5) & (0.6,1]
		buddySrc = "bunny_down.png";
	else //[0.5, 0.7) & (0.3, 0.6]
		buddySrc = "bunny_sad.png";
	updateGreyScale(gr);
}

/*chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (changes.opacity !==null && changes.opacity !== undefined){
		$("#buddy").css("opacity", changes.opacity);
	}
	if (changes.expression !== null && changes.expression !== undefined){
		strGr = $('#buddy').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		buddySrc = changes.expression; 
		if (changes.greyscale !== null && changes.greyscale !== undefined){
			updateGreyScale(changes.gr);
		}
		updateGreyScale(currGr);	
	}
});*/

$(document).ready(function() {
	var dict = {
			'opacity': 1,
			'greyscale': 0,
			'expression': 'bunny_happy.png',
			'checked':false
		};
	var incr = 0.1;
	/*Hey Dave! change this variable to test
	chrome.storage.sync.set({'expression':''})*/

	chrome.storage.sync.get(dict, getStoredValues);
	$("#page").click(function(){
		if ( $(this).is(':checked') )
			chrome.storage.sync.set({'checked':true});
		else
			chrome.storage.sync.set({'checked':false});

	});

	$("#op_up").click(function(){
		strOp = $('#buddy').css('opacity');
		currOp = parseFloat(strOp);		
		if ((currOp+incr <= 1)){
			newOp = currOp+incr;
			$("#buddy").css("opacity",newOp);
			chrome.storage.sync.set({'opacity':newOp});
		}
	});

	$("#op_down").click(function(){
		strOp = $('#buddy').css('opacity');
		currOp = parseFloat(strOp);
		if ((currOp-incr >= 0)){
			newOp = currOp-incr;
			$("#buddy").css("opacity",newOp);
			chrome.storage.sync.set({'opacity': newOp});
		}
	});

	$("#sat_up").click(function(){
		//Saturation up = Greyscale down
		strGr = $('#buddy').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		if (currGr-incr >= 0){
			newGr = currGr-incr;
			updateGreyScale(newGr);
			chrome.storage.sync.set({'greyscale':newGr});
		}
	});

	$("#sat_down").click(function(){
		//Saturation down = Greyscale up
		strGr = $('#buddy').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		if (currGr+incr <= 1){
			newGr = currGr+incr;
			updateGreyScale(newGr);
			chrome.storage.sync.set({'greyscale':newGr});
		}
	});
		
});
	