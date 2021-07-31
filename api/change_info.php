<?php
//thay đổi thông tin user
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
		$name = $obj['name'];
		$phone = $obj['phone'];
        $email1 = $obj['email'];
		$address = $obj['address'];
		$avatar = $obj['avatar'];
		$sql = "UPDATE users SET name='$name', phone='$phone', email='$email1', address='$address', avatar='$avatar' WHERE email ='$email'";
		$user = $mysqli->query($sql);
		if($user){
			$result = $mysqli->query("SELECT u.email, u.name, u.address, u.phone, u.avatar FROM users u where email = '$email1'");

			$user = mysqli_fetch_assoc($result);
			print_r(json_encode($user));
		}
		else{
			echo 'KHONG_THANH_CONG';
		}

	}
}

catch(Exception $e){
	echo 'LOI';
}



?>
