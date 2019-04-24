chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // alert(request)
  $("#317701148281405").val("Jun Iwata")
  $("#1417073758607475").val("testcasenumber")
  $('input[name=disapproval_reason]').val(['ad_disapproval'])
  $('input[name=Field1496973637295144]').val(['yes'])
  $("#224948714266660").val("000")
  $("#296084320450771").val("Please approve these ads")
  $('label[for="1496973637295144.0"]').click()

  const btn = document.getElementsByClassName("_271k _271m _1qjd _7tvm _7tv2 _7tv4")[0]
  btn.click()
  btn.click()
  btn.click()
  $('._58al').eq(0).val('111')
  $('._58al').eq(1).val('222')
  $('._58al').eq(2).val('333')
  $('._58al').eq(3).val('444')
  $('._58al').eq(4).val('555')
  $('._58al').eq(5).val('666')
  $('._58al').eq(6).val('777')
  $('._58al').eq(7).val('888')


  const btn2 = document.getElementsByClassName("_271k _271m _1qjd _7tvm _7tv2 _7tv4")[1]
  btn2.click()
  $('#u_0_8').click()



//   function clickPlanet() {
//
//     // var planets = document.getElementsByClassName("planet-name"),
//     //     randomplanet = Math.floor(Math.random() * planets.length),
//     //     clickplanet = planets[randomplanet];
//     //
//     // clickplanet.click();
//   }
//
// clickPlanet();
  sendResponse({cusName: "cusname" })
})
