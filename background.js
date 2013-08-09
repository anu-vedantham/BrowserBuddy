var alarmName = "BB"
console.log('backgroudn loaded');
	//chrome.storage.sync.clear();
	var dict = {
		'opacity': 1,
		'greyscale': 0,
		'expression': 'bunny_happy.png',
		'checked':false
	};
	chrome.storage.sync.set(dict);

chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (changes.checked !== null && changes.checked !== undefined){
		if (changes.checked.newValue === true){
			alarmInfo = {'name':alarmName, 
			'when':Date.now(), 'periodInMinutes':1};
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		function(tabs){
				console.log(tabs[0].url);
   	});
			//chrome.alarms.create(alarmName, alarmInfo);
		}
	} 

});
/*
chrome.alarms.onAlarm.addListener(function(alarm) {
	chrome.storage.get(null, function(items){
		console.log('bunny is more sad');
		op = items.opacity;
		gr = items.greyscale;
		chrome.storage.set({'opacity':op-0.3, 'greyscale':gr-0.3});
	 });
});*/