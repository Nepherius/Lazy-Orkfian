/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */

chrome.browserAction.onClicked.addListener(function(tab) {
    getCurrentTabUrl(function(url) {
        if (url !== 'http://alliancesatwar.com/construction/') {
            console.log('Must be on Alliances At War Construction Page!');
        } else {
            chrome.tabs.executeScript(null, {
                file: "js/builder.js"
            });
            console.log('Magic Happening!');
        }
    });
});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg == "playWarning") {
            let myAudio = new Audio(); // create the audio object
            myAudio.src = "sounds/warning.wav"; // assign the audio file to it
            myAudio.play(); // play the music
        } else if (request.msg == 'playNotify') {
            let myAudio = new Audio(); // create the audio object
            myAudio.src = "sounds/notify.mp3"; // assign the audio file to it
            myAudio.play(); // play the music
        }

        //sendResponse({res : response});
    });


function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}
