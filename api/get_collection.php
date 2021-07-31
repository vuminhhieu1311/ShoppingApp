<?php
//collection
	include('connect/connect.php');

	$limit = 3;
	$page = isset($_GET['page'])?$_GET['page']:1;
	settype($page, "int");
	$offset = ($page - 1) * $limit;

	$collection = $mysqli->query("SELECT p.*, GROUP_CONCAT(i.link) AS images FROM images i inner join product p ON i.id_product = p.id where inCollection=1  group by p.id  LIMIT $offset,$limit ");
	
	while ($row = $collection->fetch_object()){
		$assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}

	echo (json_encode($product));
	
?>