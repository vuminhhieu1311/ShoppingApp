<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
try{
    $name = $obj['name'];
    $price = $obj['price'];
    $color = $obj['color'];
    $material = $obj['material'];
    $description = $obj['description'];
    $idType = $obj['idType'];

    $sql = "INSERT INTO product (name, id_type, price, color, material, description, new) VALUES ('$name', '$idType', '$price', '$color', '$material', '$description', '1');";
    $product = $mysqli->query($sql);
    if($product){
        $last_id = $mysqli->insert_id;
        echo $last_id;
    }
}
catch(Exception $e){
	echo 'LOI';
}
