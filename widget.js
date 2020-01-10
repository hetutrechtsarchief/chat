$(document).ready(function() {
  $('<div class="chat" style="display: none; position:fixed; bottom: 0px; right:20px; z-index:600; width: 370px"><iframe src="https://hualab.nl/chat/online.html?' + Math.random() + '" width="370" height="210"></iframe></div>').insertAfter("#topbar");
  $(".scroll-help__button").hide()
  $(".popup-container").css("left", "20px");
  // $(".popup-container").css("width", "80%");
  $(".popup-container .toggle").css("margin-left", "0px");
  $(".popup-container .toggle").css("border-top", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-left", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-right", "2px solid #3fbfad");
  $(".popup-container .toggle").css("border-radius", "5px");

  var isSmallScreen = window.matchMedia('(max-width: 800px)').matches;

  if (!isSmallScreen) {
    $("div.chat").show();
  }

  //Wanneer er een 404 pagina door MAIS MDWS wordt getoond wordt kan via onderstaande code de gebruiker doorverwezen worden naar de zoekpagina
  $("body > div.site-content > div > div > div:nth-child(4)").append("<p>Mogelijk kunt u door te zoeken op <a style='text-decoration:underline' href='https://hetutrechtsarchief.nl/onderzoek/resultaten/archieven?mivast=39&miadt=39&mizig=0&miview=lst&mizk_alle="+(new URLSearchParams(window.location.search)).get("micode")+"'>"+(new URLSearchParams(window.location.search)).get("micode")+"</a> de gewenste pagina alsnog vinden.</p>")

});
