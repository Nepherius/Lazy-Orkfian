chrome.browserAction.onClicked.addListener(function(tab) {
    getCurrentTabUrl(function(url) {
        if (url !== 'http://alliancesatwar.com/construction/') {
            console.log('Must be on Alliances At War Construction Page!');
        } else {
            chrome.tabs.executeScript(null, {
                file: "js/plugins/jquery-3.1.0.min.js"
            }, function() {
                chrome.tabs.executeScript(null, {
                    file: "js/content.js"
                });
            });
            console.log('Magic Happening!');
        }
    });
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
