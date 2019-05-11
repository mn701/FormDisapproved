$(function(){
	const SPLIT = 5
	const MSG_CK = `Could you check on below Ads?\n`
	const MSG_CK2 = `Could you check on these ads?\n`
	const OPT1 = `A campaign already started, so client really concerns about these Ads.\n`
	const OPT2 = `*If this ad will not be approved, please let me know the reason clearly. because the user stick to this one.\n`
	const OPT3 = `Both Ads are not approved, but the other Ads with same creative and copy are approved, so please give an approval to them.\n`
	const PEND1 = `These ads has been pending review more than 24hrs.\n`
	const PEND2 = `These Ads are under reviewing for a while, `
	const PEND3 = `These Ads are under reviewing for more than 24hrs, `
	const PEND4 = `please give an approval to these Ads. \n`
	const TXT_ENTER_NAME = "(Junさん以外の場合)アイコンを右クリックして[Options]から名前をセットしてください"
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

	$('#btn-form-disapproved').click(function(){
		const caseNum = $('#case-num').val()
		const areaAds = $('#ads-area').val()
		description = $('#description').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())

			for(let i = 0; i < Math.ceil(arrAds.length/SPLIT); i++) {
  				const startCount = i * SPLIT
  				const p = arrAds.slice(startCount, startCount + SPLIT)
  				fillForm("disapproved", caseNum, p, description, agentName)
			}
		}
	})

	$('#btn-form-pending').click(function(){
		const caseNum = $('#case-num').val()
		const areaAds = $('#ads-area').val()
		description = $('#description').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())
			arrAds.forEach(function(element) {
				fillForm("pending", caseNum, element, description, agentName)
			})
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
			case 'pend1':
				msgStr += MSG_CK2 + PEND1
				break
			case 'pend2':
				msgStr += PEND2 + PEND4
				break
			case 'pend3':
				msgStr += PEND3 + PEND4
				break
			default:
		}
		msgStr += "\nBest Regards,"
		$('#description').val(msgStr)
    	})

	function fillForm(type, caseNum, ads, description, agentName){
		chrome.runtime.sendMessage({"type":type, "caseNum":caseNum, "ads":ads, "description":description, "agentName":agentName}, function (response) {});
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
		chrome.tabs.query({url: "*://*.facebook.com/help/contact/*"}, function(tabs) {
		  tabs.forEach(function(tab) {
		    chrome.tabs.sendMessage(tab.id, {'type':'submitted'}, readPopupArr)
		  })
		})
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
