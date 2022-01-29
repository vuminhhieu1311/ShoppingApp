<?php
//đăng kí
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$name = $obj['name'];
$email = $obj['email'];
$phone = $obj['phone'];
$password = md5($obj['password']);
if($name != '' && $email != '' && $phone != '' && $password != ''){
	
	$sql = "INSERT INTO users(email, password, name, phone, status) VALUES('$email', '$password', '$name', '$phone', 1)";
	$result = $mysqli->query($sql);
    
	if($result){
		echo 'THANH_CONG';
	}
	else{
		echo 'KHONG_THANH_CONG';
	}
}
else{
	echo 'KHONG_THANH_CONG';
}

?>
