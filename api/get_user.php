<?php
	include('connect/connect.php');
	$id = $_GET['id'];

	$user = $mysqli->query("SELECT u.id, u.email, u.name, u.phone, u.address, u.avatar FROM users u where u.id = $id");
	while ($row = $user->fetch_object()){
	    $user_info = $row;
	}

	echo json_encode($user_info);
?>