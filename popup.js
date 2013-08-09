var stored; /*shouldn't need to refer to this*/
var buddySrc = "testing.png"; 
var bg;

function updateGreyScale(img, newVal){
	flushDataAttributes(img);
	placeReferenceImage(img, buddySrc, img);
	addAttribute(img, "data-pb-greyscale-opacity", newVal);
	processFilters();
}

function getStoredValues(items){
	if (items != null){
		stored = $.extend(true, {}, items);
		$("#fadeOut").css("opacity",items.opacity);
		updateGreyScale($("#fadeOut")[0], items.greyscale);
	}
	else
		console.log('WE HAVE A PROBLEM');
}

$(document).ready(function() {
	var dict = {
				'opacity': 1,
				'greyscale': 0,
				'expression': 'testing.png',
				'domains': [],
				'listBadSites':[]
			};
	var incr = 0.1;
	chrome.storage.sync.get(dict, getStoredValues);
	bg = chrome.extension.getBackgroundPage();
	/* Buttons for testing
	   op_down decreases opacity by variable incr [0,1]
	   op_up increases opacity by incr [0,1]
	   sat_up decreases greyscale by incr [0,1]
	   sat_down increases greyscale by incr [0,1]
	*/
	$("#op_down").click(function(){
		strOp = $('#fadeOut').css('opacity');
		currOp = parseFloat(strOp);
		/*$("#fade2black").css("background-color","#00CC00");*/
		if ((currOp-incr >= 0)){
			newOp = currOp-incr;
			$("#fadeOut").css("opacity",newOp);
			chrome.storage.sync.set({'opacity': newOp});
		}
	});	
	$("#op_up").click(function(){
		strOp = $('#fadeOut').css('opacity');
		currOp = parseFloat(strOp);		
		if ((currOp+incr <= 1)){
			newOp = currOp+incr;
			$("#fadeOut").css("opacity",newOp);
			chrome.storage.sync.set({'opacity':newOp});
		}
	});

	$("#sat_up").click(function(){
		//Saturation up = Greyscale down
		strGr = $('#fadeOut').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		if (currGr-incr >= 0){
			img = $("#fadeOut")[0];
			newGr = currGr-incr;
			updateGreyScale(img, newGr);
			chrome.storage.sync.set({'greyscale':newGr});
		}
		
	});
	$("#sat_down").click(function(){
		//Saturation down = Greyscale up
		strGr = $('#fadeOut').attr('data-pb-greyscale-opacity');
		currGr = parseFloat(strGr);
		if (currGr+incr <= 1){
			newGr = currGr+incr;
			img = $("#fadeOut")[0];
			updateGreyScale(img, newGr);
			chrome.storage.sync.set({'greyscale':newGr});
		}
	});


});