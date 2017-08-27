<!--mysql://b5ac5b817c6f25:1f694a81@us-cdbr-iron-east-05.cleardb.net/heroku_0367002a81476ef?reconnect=true-->
<?php
$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$conn = new mysqli($server, $username, $password, $db);
?>