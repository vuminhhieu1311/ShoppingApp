<?php
	include('connect/connect.php');
	$id = $_GET['id'];
	$deleted0 = $mysqli->query("DELETE FROM bill_detail WHERE id_product = $id");
	$deleted1 = $mysqli->query("DELETE FROM images WHERE id_product = $id");
	$deleted2 = $mysqli->query("DELETE FROM comment WHERE product_id = $id");
	$deleted3 = $mysqli->query("DELETE FROM product WHERE id = $id");
	if ($deleted3) {
		echo "DELETE_SUCCESSFULLY";
	} else {
		echo "DELETE_UNSUCCESSFULLY";
	}
?>