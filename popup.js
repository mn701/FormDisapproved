$(function(){
	getCaseNumUrl()

	$('#btn-case-info').click(function(){
		const caseNum = $('#case-num').val()
		const areaAds = $('#input_text').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())
			fillForm(arrAds)
		}
	})

	function fillForm(ads){
		chrome.tabs.update({
    	url: "https://www.facebook.com/help/contact/362415677832739"
		}, function(tab) {
	    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
	      if (tabId === tab.id && changeInfo.status == 'complete') {
	        chrome.tabs.onUpdated.removeListener(listener)
	        chrome.tabs.sendMessage(tabId, ads)
	      }
	    })
		})
	}

	function getCaseNumUrl(){
		chrome.tabs.getSelected(null,function(tab) {
				const strUrl = tab.url
				const myregex = RegExp('jobs=(\\d+)')
				if(myregex.test(strUrl)){
					const strCaseNum = strUrl.match(/jobs=(\d+)/)[1]
					$("#case-num").val(strCaseNum)
				}else{
					$("#case-num").val("不明です")
				}
		})
	}
})
