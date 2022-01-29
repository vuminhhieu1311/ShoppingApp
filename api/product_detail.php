<?php
	include('connect/connect.php');
	$id = $_GET['id'];

	$products = $mysqli->query("SELECT p.id,p.name as nameProduct ,p.id_type as idType, t.name as nameType, p.price, p.color, p.material, p.description, p.number_rating as numberRating, p.total_rating as totalRating, GROUP_CONCAT(i.link) AS images FROM product p LEFT JOIN images i ON p.id = i.id_product inner join product_type t ON t.id = p.id_type where p.new = 1 and p.id=$id");
	while ($row = $products->fetch_object()){
		$assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}
	echo json_encode($product);
?>