<?php
	include('connect/connect.php');
	$id = $_GET['id'];
	$status = $_GET['status'];
	$update = $mysqli->query("UPDATE bill b SET b.status = $status WHERE b.id = $id");
	if ($update) {
		echo "UPDATE_SUCCESSFULLY";
	} else {
		echo "UPDATE_UNSUCCESSFULLY";
	}
?>