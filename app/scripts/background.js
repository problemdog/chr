'use strict';
var state=false;
var atab;

function actionClicked(tab) {
  
  	console.log('the current state is ' + state);
  
      if (!state){
          // We're off so turn it on 	
          // chrome.tabs.executeScript(null,{file: "start.js"});
          // chrome.tabs.executeScript(null,{code: "runStart();"});
          chrome.pageAction.setIcon({tabId: tab.id, path: '../images/onicon-19.png'});
          console.log('Turning on');	
          state = true;

          // TODO: save the {url: tab.url, enable: true} object on chrome storage

      } else {
          console.log('Turning off');	
          // chrome.tabs.executeScript(null,{file: "off.js"});
          // chrome.tabs.executeScript(null,{code: "runStop();"});		
          chrome.pageAction.setIcon({tabId: tab.id, path: '../images/icon-19.png'});	
          state = false;

          // TODO: save the {url: tab.url, enable: false} object on chrome storage
      }
  console.log('updateIcon completed');
    }


chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "Message received from a content script: " + sender.tab.url :
                "Message received from the extension");
    console.log('It\'s background.js speaking: I received "'+request.selection+'"');
    sendResponse({backgroundReceivedUrl: sender.tab.url,
    			  backgroundReceivedSelection: request.selection,
    			  backgroundReceivedAndApproves: true
     });
	
/*
    (function() {

    console.log('Background to call freebase API');
	var freebaseApi = "https://www.googleapis.com/freebase/v1sandbox/search?callback=myce";
	console.log('Full URL called by Background: '+freebaseApi+'&query='+request.selection);
	$.getJSON( freebaseApi, {
		query: request.selection
	})
		.done( function( data ) {
			// i has data
			sendResponse({background_received: data});
	});
	})();
	
*/
    
    
  });


chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});


chrome.pageAction.onClicked.addListener(actionClicked);


console.log('this is background.js speaking');

