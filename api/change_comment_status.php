<?php
	include('connect/connect.php');
	$id = $_GET['id'];
    $status = $_GET['status'];

	$result = $mysqli->query("UPDATE comment c SET c.status = $status where c.id = $id");
	if ($result) {
		echo "SUCCESSFULLY";
	} else {
		echo "UNSUCCESSFULLY";
	}?>