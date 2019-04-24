$(function(){
	$('#btn-case-info').click(function(){
		const areaAds = $('#input_text').val()
		if(areaAds){
			let arrAds = areaAds.split(/\r\n|\r|\n/)
			arrAds = arrAds.map(s => s.trim())
			fillForm(arrAds)
		}
	})

	function fillForm(ads){
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, ads, function(res){
				})
			}
		)
	}
})
