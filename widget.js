// $("body").append('<div style="position:fixed;right:0px;bottom:0px;background-color:red">XX</div>');
// style="position:absolute;left:0px;top:0px" class="btnIcon" id="btnChat"><img src="https://hualab.nl/chat/img/icon-chat.png?"></div>');

$('<div class="chat" style="position:fixed; bottom: 0; right:20px; z-index:600; width: 370px"><iframe src="https://hualab.nl/chat/online.html?' + Math.random() + '" width="370" height="210"></iframe></div>').insertAfter("#topbar");
$(".scroll-help__button").hide()
$(".popup-container").css("left", "20px");
$(".popup-container .toggle").css("margin-left", "0px");
$(".popup-container .toggle").css("border-top", "2px solid #3fbfad");
$(".popup-container .toggle").css("border-left", "2px solid #3fbfad");
$(".popup-container .toggle").css("border-right", "2px solid #3fbfad");
$(".popup-container .toggle").css("border-radius", "5px");