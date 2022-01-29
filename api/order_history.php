<?php
//lich sử đặt hàng
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$token = $obj['token'];

try{
	$decoded = JWT::decode($token, $key, array('HS256'));
	if($decoded->expire < time()){
		echo 'HET_HAN';
	}
	else{
		$email = $decoded->email;
		$sql = "SELECT b.id, b.date_order, b.status, b.total, b.note FROM bill b INNER JOIN users u ON u.id=b.id_customer where u.email ='$email' ORDER BY b.id DESC";
		$result = $mysqli->query($sql);
		while ($row = $result->fetch_object()){
		    $bill[] = $row;
		}
		print_r(json_encode($bill));
	}
}

catch(Exception $e){
	echo 'LOI';
}


?>