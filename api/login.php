<?php
//dang nhap
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$email = $obj['email'];
$password = md5($obj['password']);
$sql = "SELECT u.email, u.name, u.address, u.phone, u.avatar FROM users u where email = '$email' and password = '$password'";
$result = $mysqli->query($sql);

$user = mysqli_fetch_assoc($result);

if($user){
	$jwt = getToken($email);
	$array = array('token'=>$jwt, 'user'=>$user);
	print_r(json_encode($array));
}
else{
	echo 'SAI_THONG_TIN_DANG_NHAP';
}

?>