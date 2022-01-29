<?php
	include('connect/connect.php');
    $status = $_GET['status'];

	$users = $mysqli->query("SELECT u.id, u.email, u.name, u.phone, u.address, u.status, u.avatar FROM users u where u.status = $status ORDER BY u.id DESC");
	while ($row = $users->fetch_object()) {
	    $user_list[] = $row;
	}

	echo json_encode($user_list);
?>