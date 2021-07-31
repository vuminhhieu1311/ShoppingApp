<?php
	include('connect/connect.php');
    $status = $_GET['status'];

	$orders = $mysqli->query("SELECT b.*, u.email, u.phone, u.name, u.address FROM bill b INNER JOIN users u on b.id_customer = u.id WHERE b.status = $status ORDER BY b.id DESC");
	while ($row = $orders->fetch_object()) {
	    $order_list[] = $row;
	}
	echo json_encode($order_list);
?>