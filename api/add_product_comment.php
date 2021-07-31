<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
try{
    $product_id = $obj['productId'];
    $user_id = $obj['userId'];
    $comment = $obj['comment'];
    $star_number = $obj['starNumber'];

    $sql = "INSERT INTO comment (product_id, user_id, comment, star_number) VALUES ('$product_id', '$user_id', '$comment', '$star_number');";
    $result = $mysqli->query($sql);
    if($result){
        echo "SUCCESSFULLY";
    }
}
catch(Exception $e){
	echo 'UNSUCCESSFULLY';
}
