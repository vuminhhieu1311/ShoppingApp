<?php
//thay đổi thông tin user
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
try{
		$id = $obj['id'];
		$star_number = $obj['starNumber'];

		$sql = "UPDATE product SET number_rating = number_rating + 1, total_rating = total_rating + $star_number WHERE id ='$id'";
		$user = $mysqli->query($sql);
		if($user){
            echo 'SUCCESSFULLY';
		}
		else{
			echo 'UNSUCCESSFULLY';
		}
}

catch(Exception $e){
	echo 'LOI';
}
