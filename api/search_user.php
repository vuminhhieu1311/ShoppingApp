<?php
//search
	include('connect/connect.php');

	if(isset($_GET['key']) && strlen($_GET['key'])>2){
		$keyword = $_GET['key'];
		$user_list = array();
		$users = $mysqli->query("SELECT u.* FROM users u where name like '%$keyword%' or email like '%$keyword%' or phone like '%$keyword%' or address like '%$keyword%'");
		while ($row = $users->fetch_object()){
		    $user_list[] = $row;
		}
		echo (json_encode($user_list));
	}
	else{
		echo 'NHAP_TU_KHOA';
	}
?>
	