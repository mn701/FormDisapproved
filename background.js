window.popups = []
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    	if(request && request.type == "copy"){
    		console.log(request.text)
    		saveToClipboard(request.text)
    	}else if (request.type === "ads") {
        const caseNum = request.caseNum
        const ads = request.ads

        chrome.tabs.create({
        	url: "https://www.facebook.com/help/contact/362415677832739"
        }, function(tab) {
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status == 'complete') {
              chrome.tabs.onUpdated.removeListener(listener)
              chrome.tabs.sendMessage(tabId, {"caseNum":caseNum, "ads":ads}, function(res){})
            }
          })
        })
        getPopupBg()
      }else if(request.type === "popup"){
        window.popups.push(`${request.info} ${request.submitted} ${request.created})
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

function getPopupBg(){
  chrome.tabs.query({currentWindow: true, active: true},
    function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {'type':'submitted'}, function(res){
        if(res){
          popups.push(res.info, res.form_submitted, res.created)
          console.log(res.info, res.form_submitted, res.create)
        }
      })
    }
  )
}
