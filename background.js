var alarmName = "BB"

$(document).ready(function(){
	chrome.storage.sync.clear();
	var dict = {
		'opacity': 1,
		'greyscale': 0,
		'expression': 'testing.png',
		'checked':false
	};
	chrome.storage.sync.set(dict);
})

chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (changes.checked !== null){
		if (changes.checked === true){
			alarmInfo = {'name':bs.alarmName, 
			'when':Date.now(), 'periodInMinutes':1};
			chrome.alarms.create(alarmName, alarmInfo);
		}
		else{
			chrome.alarms.clear(alarmName);
		}
	} 

});

chrome.alarms.onAlarm.addListener(function(alarm) {
	chrome.storage.get(null, function(items){
		alert('buddy is more sad');
		op = items.opacity;
		gr = items.greyscale;
		chrome.storage.set({'opacity':op-0.3, 'greyscale':gr-0.3});
	 });
});