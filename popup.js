var buddySrc = "testing.png";

function updateGreyScale(newVal){
	img = $("#buddy")[0];
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

(document).ready(function() {
		var dict = {
				'opacity': 1,
				'greyscale': 0,
				'expression': 'testing.png',
				'checked':false
			};

		chrome.storage.sync.get(dict, getStoredValues);
		$("#page").click(function(){
			chrome.storage.sync.set({'checked':true});
		});
		chrome.storage.onChanged.addListener(function(changes, areaName) {
			if (changes.opacity !==null){
				$("#buddy").css("opacity",changes.opacity);
			}
			if (changes.greyscale !== null){
				updateGreyScale()
			}
		});
});