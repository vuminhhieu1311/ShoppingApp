<?php
	include('connect/connect.php');
	$id = $_GET['id'];

	$order = $mysqli->query("SELECT b.id, b.date_order as orderDate, b.status, b.total, b.id_customer as customerId, b.note FROM bill b where b.id = $id");
	while ($row = $order->fetch_object()){
	    $order_detail = $row;
	}

    $products = $mysqli->query("SELECT b.id_product as id, b.quantity, b.price, p.name, p.color, p.material, p.description, p.id_type as typeId, t.name as typeName, GROUP_CONCAT(i.link) AS images FROM bill_detail b inner join product p on b.id_product = p.id inner join product_type t on p.id_type = t.id INNER JOIN images i ON i.id_product = p.id where b.id_bill = $id group by p.id");
    while ($row = $products->fetch_object()){
        $assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}
    $order_detail->products = $product;
	echo json_encode($order_detail);
?>