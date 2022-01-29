<?php
	include('connect/connect.php');
	$id = $_GET['id'];
    $status = $_GET['status'];

	$change = $mysqli->query("UPDATE users u SET u.status = $status where u.id = $id");
	if ($change) {
		echo "SUCCESSFULLY";
	} else {
		echo "UNSUCCESSFULLY";
	}
?>