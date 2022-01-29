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
		$sql = "SELECT u.id, u.email, u.name, u.phone, u.address FROM users u where u.email ='$email'";
		$result = $mysqli->query($sql);
		while ($row = $result->fetch_object()){
		    $user = $row;
		}
		print_r(json_encode($user));
	}
}

catch(Exception $e){
	echo 'LOI';
}


?>