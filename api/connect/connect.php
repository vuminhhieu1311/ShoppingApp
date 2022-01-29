<?php
date_default_timezone_set("Asia/Ho_Chi_Minh");

// $conn = mysqli_connect("localhost", "root", "");
$mysqli = mysqli_connect("localhost", "root", "", "db_app");
$mysqli->set_charset("utf8");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
?>
