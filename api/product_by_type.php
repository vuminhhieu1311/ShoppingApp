<?php

	include('connect/connect.php');
	$id_type = $_GET['id_type'];

	$limit = 5;
	$page = isset($_GET['page'])?$_GET['page']:1;
	settype($page, "int");
	$offset = ($page - 1) * $limit;
	
	$products = $mysqli->query("SELECT p.id, p.name, p.id_type, p.price, p.color, p.material, p.description, p.number_rating as numberRating, p.total_rating as totalRating, t.name as nameType, GROUP_CONCAT(i.link) AS images FROM product p inner join product_type t ON t.id = p.id_type INNER JOIN images i ON i.id_product = p.id WHERE id_type = $id_type group by p.id ORDER BY p.id DESC LIMIT $offset,$limit ");
	
	while ($row = $products->fetch_object()){
	    $assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}

	echo json_encode($product);


?>
