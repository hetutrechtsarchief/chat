$(document).ready(function() {
  $('<div class="chat" style="display: none; position:fixed; bottom: 0px; right:20px; z-index:600; width: 370px"><iframe src="https://hualab.nl/chat/online.html?' + Math.random() + '" width="370" height="210"></iframe></div>').insertAfter("#topbar");
  $(".scroll-help__button").hide()
  $(".popup-container").css("left", "20px");
  $(".popup-container").css("width", "200px");
  $(".popup-content").css("width", "300px");
  
  $(".popup-container .toggle").css("margin-left", "0px");
  $(".popup-container .toggle").css("border-top", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-left", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-right", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-radius", "5px");

  var isSmallScreen = window.matchMedia('(max-width: 800px)').matches;

  if (!isSmallScreen) {
    $("div.chat").show();
  }

  // dit is versie 2 van een experiment voor het testen van live zoek suggesties
  $('#searchall-term, #homepage-search-term').on("blur keypress", function(e) {
    if (e.type === 'blur' || e.keyCode === 13) {
      var params = {
        q: $(e.target).val(),
        id: $(e.target).attr("id")
      }
      var q = Object.keys(params).map(key => key + '=' + params[key]).join('&');
      fetch("https://hualab.nl/livesearch?" + q, {mode:'no-cors'});
    }
  });

  // 2 mei 2020: dit is een HUALab experiment voor linken vanaf
  // de Beeldbank van Het Utrechts Archief naar documentatie.org

  function createUDSlink() {
    var ids = { 20362:225167,216661:225174,30728:225103,39375:225120,64606:219219,64607:219209,818061:216417,35630:219175,35622:218971,122231:192995,122232:193972,122233:194054,122283:225071,122379:205297,122384:205320,122407:217587,122918:221894,123916:217545,1497:221770,135011:205630,135010:194706,20361:225017,214555:217103,216576:205122,216577:205369,24833:194198,24842:213079,2663:194151,28334:218534,28593:221821,28649:205584,30467:203607,30481:179073,30576:192983,30706:211758,30727:216906,30757:204893,35583:217056,35585:217072,35742:221943,35782:221629,36066:212525,36838:205099,37360:217034,37361:217027,37827:221708,40617:204876,42177:204721,42765:221261,43602:224981,4854:213855,51190:198534,52516:224997,52526:213877,56238:224135,56239:224136,570:211903,57064:213019,571:212242,59466:213246,59468:211893,59550:222672,602165:217561,63848:223441,63853:223465,63854:223180,66897:221613,69781:204703,70773:213512,72839:205005,72857:205350,72858:205253,74406:217573,78118:217054,824071:205276,832228:212212,83337:218529,84071:205017,84073:205023,84076:205229,84741:203725,122905:180241,26330:213991,28406:180259,55975:203791,84344:180256,84345:180254,84346:180250,84347:180248,84348:180745,84349:180747,84350:180748,84351:180287,84352:181813,84353:181934,84354:181935,30775:186411 }
    var catnr = $("li.catalogusnummer span.metadata-content-text").text();
    var udsId = ids[parseInt(catnr)];
    if (udsId) {
      $("<li><div class='metadata-heading'>Meer informatie</div><div>De gebouwen op deze afbeelding zijn geïdentificeerd en elk aanklikbaar gemaakt op de website <a target='_blank' href='http://www.documentatie.org/idUDSpagina.asp?id="+udsId+"'>documentatie.org</a>.</div></li>").insertAfter('li.uitleg_auteursrechten');
    }
  }

  setTimeout(function() {
    createUDSlink();

    new MutationObserver(function(mutationsList,observer) { 
      for (let mutation of mutationsList) {
        if (mutation.target==document.querySelector(".mediabank-detail-metadata")) {
          createUDSlink();
        }
      }
    }).observe(document.querySelector(".mediabank-detail-panels"), { attributes: true, childList: true, subtree: true });
    
  },1000);

});
