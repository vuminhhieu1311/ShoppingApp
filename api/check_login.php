<?php
//kiem tra dang nhap
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$token = $obj['token'];
$key = "example_key";
try{
	$decoded = JWT::decode($token, $key, array('HS256'));
	if($decoded->expire < time()){
		echo 'HET_HAN';
	}
	else{
		$jwt = getToken($decoded->email);
		$decoded = JWT::decode($jwt, $key, array('HS256'));
		$email = $decoded->email;
		$sql = "SELECT * FROM users where email = '$email'";
		$result = $mysqli->query($sql);

		$user = mysqli_fetch_assoc($result);

		if($user){
			$jwt = getToken($email);
			$array = array('token'=>$jwt, 'user'=>$user);
			print_r(json_encode($array));
		}
	}
}
catch(Exception $e){
	echo 'TOKEN_KHONG_HOP_LE';
}

?>
