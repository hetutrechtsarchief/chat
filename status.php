<?php
// header("Set-Cookie: HttpOnly;Secure;SameSite=Strict");

// available,chat
// away,dnd,xa,
// unavailable

$usernames = [ "hjansen", "mieke", "r.companje", "anna", "mustafa", "reinier", "nettie" ];
shuffle($usernames);
$users = [];
foreach  ($usernames as $username) {
  $user = [];
  $user["name"] = $username;
  $user["status"]= file_get_contents("https://eu.libraryh3lp.com/presence/jid/$username/eu.libraryh3lp.com/text");
  $users[] = $user;
}

$current_username = "";
$current_status = "offline";


//first check 'away's
foreach ($users as $user) { //$user["status"]=="away" || 
  if ($user["status"]=="dnd" || $user["status"]=="xa") {
    $current_username = $user["name"];
    $current_status = "away";
  }
}

//if there's an 'available' user that one gets priority
foreach ($users as $user) {
  if ($user["status"]=="available" || $user["status"]=="chat") {
    $current_username = $user["name"];
    $current_status = "online";
  }
}

if ($_SERVER['QUERY_STRING']=='debug') {
  header('Content-Type: application/json');
  echo json_encode($users);
  die();
}

if ($_SERVER['QUERY_STRING']=='json') {
  header('Content-Type: application/json');
  $obj = (object)['user'=>$current_username, 'status'=>$current_status];
  echo json_encode($obj);
  die();
}

// if ($_SERVER['QUERY_STRING']=='image') {
  header('Content-Type: image/png');

  if ($current_status=="offline") {
    //when everyone is offline we can't show a user's icon and name  
    imagepng(imagecreatefrompng("img/status/offline.png"));
  } else if ($current_status=="away") {
    imagepng(imagecreatefrompng("img/status/away.png"));
  } else {
    //when at least one person is online or away we can show that user's icon and name
    $icon = imagecreatefrompng("img/icons/$current_username.png");
    $name = imagecreatefrompng("img/names/$current_username.png");
    $status = imagecreatefrompng("img/status/$current_status.png");
    $dest = imagecreatetruecolor(imagesx($icon)+imagesx($name)+imagesx($status), 60); 

    imagecopy($dest, $icon, 
      /*dst xy:*/ 0, 0, 
      /*src xy:*/ 0, 0,  
      /*src wh:*/ 60, 60); 

    imagecopy($dest, $name, 
      /*dst xy:*/ 60, 0, 
      /*src xy:*/ 0, 0,  
      /*src wh:*/ imagesx($name), 60); 

    imagecopy($dest, $status, 
      /*dst xy:*/ 60 + imagesx($name), 0, 
      /*src xy:*/ 0, 0,  
      /*src wh:*/ imagesx($name) + imagesx($status), 60); 

    header('Content-Type: image/png');
    imagepng($dest);
  }

// } else { //show as text
//   if ($current_status!="online") echo($current_status);
//   else echo "$current_username: $current_status";
// }

?>
