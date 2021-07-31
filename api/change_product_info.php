<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
try{
    $id = $obj['id'];
    $name = $obj['name'];
    $price = $obj['price'];
    $color = $obj['color'];
    $material = $obj['material'];
    $description = $obj['description'];
    $sql = "UPDATE product SET name='$name', price='$price', color='$color', material='$material', description='$description', new=1 WHERE id ='$id'";
    $product = $mysqli->query($sql);
    if($product){
        echo 'SUCCESSFULLY';
    }
    else{
        echo 'UNSUCCESSFULLY';
    }
}
catch(Exception $e){
	echo 'LOI';
}
