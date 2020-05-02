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
  setTimeout(function() {
    var ids = { 64606:219219,64607:219209,818061:216417,35630:219175,35622:218971 }
    var catnr = $("li.catalogusnummer span.metadata-content-text").text();
    var udsId = ids[parseInt(catnr)];
    if (udsId) {
      $("<li><div class='metadata-heading'>Meer informatie</div><div>De gebouwen op deze afbeelding zijn geïdentificeerd en aanklikbaar gemaakt op <a target='_blank' href='http://www.documentatie.org/idUDSpagina.asp?id="+udsId+"'>documentatie.org</a>.</div></li>").insertAfter('li.uitleg_auteursrechten');
    }
    
  },1000);


});
