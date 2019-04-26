chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.ads){
		const caseNum = request.caseNum
	  const ads = request.ads
	  $("#317701148281405").val("Jun Iwata")
	  if(caseNum){
	    $("#1417073758607475").val(caseNum)
	  }
	  $('input[name=disapproval_reason]').val(['ad_disapproval'])
	  $('input[name=Field1496973637295144]').val(['yes'])
	  $("#224948714266660").val(ads[0])
	  $("#296084320450771").val("Dear team,\n\nCould you check on below Ad?\nA campaign already started, so client really concerns about this Ad.\n\n*If this ad will not be approved, please let me know the reason clearly. because the user stick to this one.\n\nBest Regards,")
	  $('label[for="1496973637295144.0"]').click()

	  const btnAdd = document.getElementsByClassName("_271k _271m _1qjd _7tvm _7tv2 _7tv4")[0]
	  const ad_rows = ads.length - 5
	  for (let i = 0; i < ad_rows; i++) {
	    btnAdd.click()
	  }
	  ads.forEach((item, index) => {
	    $('._58al').eq(index).val(item)
	  })
	  const btnConfirm = document.getElementsByClassName("_271k _271m _1qjd _7tvm _7tv2 _7tv4")[1]
	  btnConfirm.click()
	  $('#u_0_8').click()
	  sendResponse("hi")
	}else if(request.type == "submitted"){
		const info = $('#u_n_0').text() ?  $('#u_n_0').text() : ""
		const form_submitted = $('#u_4_0').text() ?  $('#u_4_0').text() : ""
		const created = $("div[class='pam _13']").text() ? $("div[class='pam _13']").text() : ""
		sendResponse({info:info, form_submitted: form_submitted, created:created })
	}

})
