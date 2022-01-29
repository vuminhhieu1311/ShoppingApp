<?php
	include('connect/connect.php');

	$orders = $mysqli->query("SELECT b.*, u.email, u.phone, u.name, u.address FROM bill b INNER JOIN users u on b.id_customer = u.id ORDER BY b.date_order DESC");
	while ($row = $orders->fetch_object()){
	    $order_list[] = $row;
	}

	echo json_encode($order_list);
?>