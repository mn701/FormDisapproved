$(function(){
	const TXT_UNKNOWN = "不明です"
	const TXT_FAIL = "あいにく、情報を取得できませんでした"

	$('#btn-case-info').click(function(){
			getCaseNumUrl()
			getTabElements()
	})



	function getCaseNumUrl(){
		chrome.tabs.getSelected(null,function(tab) {
				const strUrl = tab.url
				const myregex = RegExp('jobs=(\\d+)')
				if(myregex.test(strUrl)){
					const strCaseNum = strUrl.match(/jobs=(\d+)/)[1]
					$("#case-num").val(strCaseNum)
				}else{
					$("#case-num").val(TXT_UNKNOWN)
				}
		})
	}

	function getTabElements(){
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, 'hi', function(res){
				})
			}
		)
	}

	function showMsg(str){
		alert(txt_clip + str)
		chrome.runtime.sendMessage({
			type: 'copy',
			text: str
		})
	}
})
