$(function(){
	const SPLIT = 5
	const bg = chrome.extension.getBackgroundPage()
	if(bg.popups){
		bg.popups.forEach(function(element) {
			const div = document.createElement('div')
			div.textContent = element
			document.body.appendChild(div)
		})
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
				chrome.tabs.sendMessage(tabs[0].id, {'type':'submitted'}, function(res){
					if(res){
						console.log(res.info, res.form_submitted, res.created)
					}
				})
			}
		)
	}
})
