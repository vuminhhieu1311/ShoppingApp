<?php
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
        $avatar = $obj['avatar'];
		$sql = "UPDATE users u SET u.avatar = '$avatar' where u.email ='$email'";
		$result = $mysqli->query($sql);
		if($result) {
            echo 'SUCCESSFULLY';
        } else {
            echo 'UNSUCCESSFULLY';
        }
	}
}

catch(Exception $e){
	echo 'LOI';
}
?>