function BadSite(wId, tId, url){
	if (wId === null){
		wId = 0;
	}
	if (tId === null){
		tId = 0;
	}
	if(url ===  null){
		url = '';
	}
	this.windowId = wId;
	this.tabId = tId;
	this.url = url;
	this.alarmName = toString(wId)+' '+toString(tId);
	this.updateWindowId = function updateWindowId(wId){
		this.windowId = wId;
	}
	this.updateTabId = function updatetabId(tId){
		this.tabId = tId;
	}
	this.updateUrl = function updateUrl(newUrl){
		this.url = newUrl;
	}
}

function isBadSite(url){
	/*First check if url is valid*/
	if (url === null)
		return false;
		/*If url is valid, 
		  check if it's of a domain blacklisted by the user
	 	*/
	var returnValue = false;
	chrome.storage.sync.get('domains', function(items){
		for (d in items.domains){
			if (d.indexOf(url) !== -1 || url.indexOf(d) !== -1){
				returnValue = true;
			}
		}
	});
	return returnValue;
}

function addBadSite(windowId, tabId, url){
	if (isBadSite(url)){
		bs = new BadSite(windowId, tabId, url);
		//Gotta add an alarm
		var newList;
		chrome.storage.sync.get('listBadSites', function(items){
			var oldList = items.listBadSites;
			newList = $.extend(true, {},oldList);
			newList.push(bs);
		});
		chrome.storage.sync.set({'listBadSites': newList});
	}
}
function removeBadSite(bs, wId, tId, url){
	var ind;
	chrome.storage.sync.get('listBadSites', function(items){
		newList = $.extend(true, {}, items.listBadSites);
		
		if (bs !== null)
			ind = newList.indexOf(bs);
		else{
			for (b in items.listBadSites){
				if ((tId !== null) && (tId === b.tabId))
					ind = newList.indexOf(b);
				else if ((wId !==  null) && (wId === b.windowId))
					ind = newList.indexOf(b);
			}
		}
	});
	if (ind != null){
		newList.splice(ind, 1);
		chrome.storage.sync.set({'listBadSites': newList});
	}
	else
		alert("didn't find bad site");
}


chrome.tabs.onCreated.addListener(function(tab){
	var url = tab.url;
	/*check if url is valid*/
	if (url === ''|| url ===null)
		url = null;
	addBadSite(tab.windowId, tab.id, url);
	//alert('got created');	
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var oldList;
	var theSite = null;
	/*check if the url changed. If not, then nothing to update*/
	if (changeInfo.url === null)
		return;
	/*Check if this tab is in the list of badLists*/
	chrome.storage.sync.get('listBadSites', function(items){
		oldList = items.listBadSites;
	});

	for (bs in oldList){
		if (bs.tabId === tabId){
			theSite= $.extend(true, {}, bs);
			theSite.url = changeInfo.url;			
			break;
		}
	}
	/*If it is, check if it still should be in BadList
	  Else, check if it should be added to BadList*/
	  if (theSite === null)
	  	addBadSite(tab.windowId, tabId, changeInfo.url);
	  else{
	  	if (!isBadSite(theSite.url))
	  		removeBadSite(theSite);
	  }
});

/* Not for the demo
chrome.tabs.onMoved.addListener(function(tabId, moveInfo){});
chrome.tabs.onHighlighted.addListener(function(highlightInfo) {}); 
chrome.tabs.onDetached.addListener(function(tabId, detachInfo) {});
chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {});
*/

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	if(isBadSite(tabId.url))
		removeBadSite(null, removeInfo.windowId, tabId, null);	
});
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {});

chrome.windows.onRemoved.addListener(function(windowId) {
	
});
chrome.windows.onFocusChanged.addListener(function(windowId) {});