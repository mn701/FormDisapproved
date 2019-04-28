$(function(){
	const SPLIT = 5
	const bg = chrome.extension.getBackgroundPage()
	if(bg && bg.popups){
		readPopupArr()
	}

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

	$('#get-popup').click(getPopup)

	$('#btn-bg-clr').click(function(){
		bg.popups.length = 0
		close()
	})

	$('#btn-bg-copy').click(function(){
		let copyStr = ""
		bg.popups.forEach(function(element) {
			copyStr += element + "\n";
		})
		copyToClipbd(copyStr)
	})



	function fillForm(caseNum, ads){
		chrome.runtime.sendMessage({"type":"ads", "caseNum":caseNum, "ads":ads}, function (response) {});
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
				chrome.tabs.sendMessage(tabs[0].id, {'type':'submitted'}, readPopupArr)
			}
		)
	}

	function readPopupArr(){
		document.getElementById("lst").innerHTML = ""
		bg.popups.forEach(function(element) {
			msgList = "<li>" + element + "</li>";
       		document.getElementById("lst").innerHTML += msgList
		})
	}

	function copyToClipbd(str){
		chrome.runtime.sendMessage({
			type: 'copy',
			text: str
		})
	}
})
