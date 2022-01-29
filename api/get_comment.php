<?php
	include('connect/connect.php');
	$product_id = $_GET['product_id'];

	$result = $mysqli->query("SELECT c.*, u.name, u.avatar FROM comment c INNER JOIN users u ON c.user_id = u.id where c.product_id = $product_id and c.status = 0 ORDER BY c.id DESC");
	while ($row = $result->fetch_object()){
	    $comment_list[] = $row;
	}

	echo json_encode($comment_list);
?>