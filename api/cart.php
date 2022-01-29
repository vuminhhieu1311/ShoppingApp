<?php
//cart
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$key = "example_key";
	
	$arrayDetail = $obj['arrayDetail'];
	$note = $obj['note'];
	$token = $obj['token'];

try{
	$decoded = JWT::decode($token, $key, array('HS256'));
	if($decoded->expire < time()){
		echo 'HET_HAN';
	}
	else{
		$email = $decoded->email;
		$sql = "SELECT * FROM users where email = '$email'";
		$result = $mysqli->query($sql);
		$user = mysqli_fetch_assoc($result);
		$id_user = $user['id'];

		$tongtien = 0;
		foreach ($arrayDetail as $value) {
			$id_sp = $value['id'];
			$sanpham = $mysqli->query("select price from product where id=$id_sp");
			$product = mysqli_fetch_assoc($sanpham);
			$tongtien += $product['price'];
		}
		$todate = date('Y-m-d h:i:s');
		$sql = "INSERT INTO bill(id_customer,date_order, total, note) VALUES ($id_user, '$todate', $tongtien, '$note')";

		$mysqli->query($sql);
		$id_bill = $mysqli->insert_id;
		foreach ($arrayDetail as $value) {
			$product = $mysqli->query("Select * FROM product where id=$value[id]");
			$product = mysqli_fetch_assoc($product);
			$price = $product['price'];
			$sql = "INSERT INTO bill_detail(id_bill,id_product, quantity, price) VALUES ($id_bill, $value[id], $value[quantity], $price)";
			$mysqli->query($sql);
			
		}
		echo 'THEM_THANH_CONG';
	}
}
catch(Exception $e){
	echo 'TOKEN_KHONG_HOP_LE';
}


	/*
	$array = json_decode('{
			"idUser":1,
			"arrayDetail": [
				{ "id": 33, "quantity": 3 },
				{ "id": 34, "quantity": 3 }
			]
		}');
	*/
?>