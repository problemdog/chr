'use strict';

console.log('FreeBase extension loaded');

/* function myFreebaseCallback(result) {
	console.log('I\'m coming from the myFreebaseCallback function body');
	console.dir(result);
} */

function getSelectionText() {
    var text = '';
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text;
    }
    return text;
}


$('p').dblclick(function() {
  
  	var sel = getSelectionText();
  	console.log(sel);

  // send a message to the background.js to ask whether we are switched on

  	chrome.runtime.sendMessage({selection: sel}, function(response) {
  		console.log('Backgroud answers:');
  		console.dir(response);
	});

  	/*
	
	var freebaseApi = 'https://www.googleapis.com/freebase/v1sandbox/search';
		
	$.ajax({
            url: freebaseApi,
            data: {
                'query': sel
            },
            dataType: 'json',
            jsonp: false,
            jsonpCallback: 'myFreebaseCallback',
            beforeSend:function(){
                console.log('beforeSend is happening');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + errorThrown);
            },
            success: function (data) {
            	console.log('I\'m within the success branch');
                console.dir(data);
                // $('#output').val(data.contents);
            },
             complete:function(){
                console.log('json downloaded');
            }
        });

	*/


	// from: https://gist.github.com/nichtich/674522
	var baseURL = 'http://en.wiktionary.org';
	$.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+sel,
    function(json) {
      if(json.parse.revid > 0) {
        console.log(json.parse.text['*']);
      } else {
        console.log('word not found');
      }
    });



		

//  $('body').append('<div id="FreeBaseInfoContainerPopup" style="display: none; position: fixed; top: 0; right: 0; width: 500px; min-height: 100px; background-color: #444; color: #f7a7a7; z-index: 40000">You have selection <b>'+sel+'</b> and I\'m looking for relevant data...<div>');
//  $('div#FreeBaseInfoContainerPopup').show().fadeOut(5000).remove();

});






