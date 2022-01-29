<?php
	include('connect/connect.php');
	$id = $_GET['id'];

	$images = $mysqli->query("SELECT id, link FROM images where id_product = $id");

    while ($row = $images->fetch_object()){
	    $image_list[] = $row;
	}
	echo json_encode($image_list);
?>