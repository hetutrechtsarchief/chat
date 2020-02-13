<?php
$msg = date("Y-m-d H:i") . "\n";
file_put_contents("chat.log", $msg, FILE_APPEND);
?>