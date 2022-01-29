<?php
	include('connect/connect.php');
	
	$products = $mysqli->query('SELECT p.id,p.name as name ,p.id_type as idType, t.name as nameType, p.price, p.color, p.material, p.description, p.number_rating as numberRating, p.total_rating as totalRating, GROUP_CONCAT(i.link) AS images FROM product p LEFT JOIN images i ON p.id = i.id_product inner join product_type t ON t.id = p.id_type where p.new = 1 group by p.id ORDER BY p.id DESC');
	while ($row = $products->fetch_object()){
		$assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}


	$product_types = $mysqli->query("Select * from product_type");
	while ($type = $product_types->fetch_object()){
	    $product_type[] = $type;
	}
	
	$array = array('type'=>$product_type,'product'=>$product);
	echo json_encode($array);


?>
