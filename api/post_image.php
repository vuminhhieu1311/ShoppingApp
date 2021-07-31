<?php
	include('connect/connect.php');
	$id = $_GET['id'];
    $link = $_GET['link'];
	$insert = $mysqli->query("INSERT INTO images (link, id_product) VALUES ($link, $id);");
	if ($insert) {
		echo "SUCCESSFULLY";
	} else {
		echo "UNSUCCESSFULLY";
	}
?>