window.popups = []
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    	if(request && request.type == "copy"){
    		console.log(request.text)
    		saveToClipboard(request.text)
    	}else if (request.type === "disapproved") {
        const caseNum = request.caseNum
        const ads = request.ads
        const description = request.description
        const agentName = request.agentName

        chrome.tabs.create({
        	url: "https://www.facebook.com/help/contact/362415677832739"
        }, function(tab) {
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status == 'complete') {
              chrome.tabs.onUpdated.removeListener(listener)
              chrome.tabs.sendMessage(tabId, {"type":"disapproved", "caseNum":caseNum, "ads":ads, "description":description, "agentName":agentName}, function(res){})
            }
          })
        })
      }else if (request.type === "pending") {
        const caseNum = request.caseNum
        const ad = request.ads
        const description = request.description
        chrome.tabs.create({
        	url: "https://www.facebook.com/help/contact/305334410308861"
        }, function(tab) {
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status == 'complete') {
              chrome.tabs.onUpdated.removeListener(listener)
              chrome.tabs.sendMessage(tabId, {"type":"pending", "caseNum":caseNum, "ad":ad, "description":description}, function(res){})
            }
          })
        })
      }else if(request.type === "popup"){
      	const msg = request.msg
        window.popups.push(msg)
      }
  }
)

function saveToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}


