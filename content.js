chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const ads = request
  $("#317701148281405").val("Jun Iwata")
  $("#1417073758607475").val("testcasenumber")
  $('input[name=disapproval_reason]').val(['ad_disapproval'])
  $('input[name=Field1496973637295144]').val(['yes'])
  $("#224948714266660").val("000")
  $("#296084320450771").val("Please approve these ads")
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
})
