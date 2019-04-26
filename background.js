chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	if(request && request.type == "copy"){
    		console.log(request.text)
    		saveToClipboard(request.text);
    	}else if (request.type === "ads") {
        const caseNum = request.caseNum
        const ads = request.ads

        chrome.tabs.create({url: "https://www.facebook.com/help/contact/362415677832739"}, function (tab) {  //create tab
          chrome.tabs.executeScript(tab.id, {file: 'jquery-3.1.0.min.js'}, function(){ 
            chrome.tabs.executeScript(tab.id, {file: 'content.js'}, function(){  //inject content script
                chrome.tabs.sendMessage(tab.id, {"caseNum":caseNum, "ads":ads});  //send message to content script
            })
          })
        })
    }
})

function saveToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}
