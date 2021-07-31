<?php
	include('connect/connect.php');
	$id = $_GET['id'];
    $link = $_GET['link'];
	$update = $mysqli->query("UPDATE images i SET i.link = ${link} WHERE i.id = $id");
	if ($update) {
		echo "SUCCESSFULLY";
	} else {
		echo "UNSUCCESSFULLY";
	}
?>