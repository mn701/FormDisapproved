$(function(){
	const SPLIT = 5
	const MSG_CK = `Could you check on below Ads?\n`
	const OPT1 = `A campaign already started, so client really concerns about these Ads.\n`
	const OPT2 = `*If this ad will not be approved, please let me know the reason clearly. because the user stick to this one.\n`
	const OPT3 = `Both Ads are not approved, but the other Ads with same creative and copy are approved, so please give an approval to them.\n`
	const TXT_ENTER_NAME = "アイコンを右クリックして[Options]から名前をセットしてください"
	const bg = chrome.extension.getBackgroundPage()
	let description = "Dear team,\n\nCould you check on below Ad?\nA campaign already started, so client really concerns about this Ad.\n\n*If this ad will not be approved, please let me know the reason clearly. because the user stick to this one.\n\nBest Regards,"
	let agentName = 'Jun Iwata'
	chrome.storage.sync.get('agentName', function(option){
		if(option.agentName){
			agentName = option.agentName
		}else{
			$('#err').text(TXT_ENTER_NAME)
		}
	})

	
	readPopupArr()
	getCaseNumUrl()
	
	$('#btn-case-info').click(function(){
		const caseNum = $('#case-num').val()
		const areaAds = $('#ads-area').val()
		description = $('#description').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())

			for(let i = 0; i < Math.ceil(arrAds.length/SPLIT); i++) {
  				const startCount = i * SPLIT
  				const p = arrAds.slice(startCount, startCount + SPLIT)
  				console.log(p)
  				fillForm(caseNum, p, description, agentName)
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
		if(bg && bg.popups){
			bg.popups.forEach(function(element) {
				copyStr += element + "\n";
			})
			copyToClipbd(copyStr)
		}
	})
	
	$('#btn-ads-clr').click(function(){
		$('#ads-area').val("")
	})
	
	$('#btn-desc-clr').click(function(){
		$('#description').val("")
	})
	
	$('input[name=descGrp]').click(function(){
		const selected = $("input:radio[name=descGrp]:checked").val()
		let msgStr = "Dear team,\n\n"
		switch (selected){
			case 'option1':
				msgStr += MSG_CK + OPT1
				break
			case 'option2':
				msgStr += MSG_CK + OPT1 + "\n" + OPT2
				break
			case 'option3':
				msgStr += OPT3
				break
			default:
		}
		msgStr += "\nBest Regards,"
		$('#description').val(msgStr)
    	})

	function fillForm(caseNum, ads, description, agentName){
		chrome.runtime.sendMessage({"type":"ads", "caseNum":caseNum, "ads":ads, "description":description, "agentName":agentName}, function (response) {});
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
		if(bg && bg.popups){
			document.getElementById("lst").innerHTML = ""
			bg.popups.forEach(function(element) {
				msgList = "<li>" + element + "</li>";
	       		document.getElementById("lst").innerHTML += msgList
			})
		}
	}

	function copyToClipbd(str){
		chrome.runtime.sendMessage({
			type: 'copy',
			text: str
		})
	}
})
