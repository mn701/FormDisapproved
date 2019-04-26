$(function(){
	SPLIT = 5
	getCaseNumUrl()

	$('#btn-case-info').click(function(){
		const caseNum = $('#case-num').val()
		const areaAds = $('#input_text').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())


			for(let i = 0; i < Math.ceil(arrAds.length/SPLIT); i++) {
  				const startCount = i * SPLIT
  				const p = arrAds.slice(startCount, startCount + SPLIT)
  				console.log(p)
  				fillForm(caseNum, p)
  				getPopup()
			}
		}
	})

	$('#get-popup').click(getPopup())

	function fillForm(caseNum, ads){
		chrome.tabs.update({
    	url: "https://www.facebook.com/help/contact/362415677832739"
		}, function(tab) {
	    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
	      if (tabId === tab.id && changeInfo.status == 'complete') {
	        chrome.tabs.onUpdated.removeListener(listener)
	        chrome.tabs.sendMessage(tabId, {"caseNum":caseNum, "ads":ads}, function(res){

	        })
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
				}
		})
	}

	function getPopup(){
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {'type':'submitted'}, function(res){
					if(res){
						console.log(res.info, res.form_submitted, res.created)
					}
				})
			}
		)
	}
})
