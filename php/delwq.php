<?php
require('./_connect.php');

$id = $_REQUEST['id'];

$sql = "DELETE FROM `info` WHERE `product_id`=$id";

$result = mysqli_query($conn,$sql);

if(result){
    echo json_encode(array("code"=>1));
}else{
    echo json_encode(array("code"=>0));
}



?>