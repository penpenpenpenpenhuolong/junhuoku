<?php
require('./_connect.php');

$id = $_REQUEST['id'];
$name = $_REQUEST['name'];
$img = $_REQUEST['img'];
$price = $_REQUEST['price'];
$num = $_REQUEST['num'];

$sql = "SELECT * FROM `info` WHERE `product_id`= '$id'";
$res = mysqli_query($conn,$sql);
$rows= mysqli_num_rows($res);
if($rows>0){
    $rows = mysqli_fetch_assoc($res);
    $num = $row['product num']+$num;
    $sql = "UPDATE `info` SET  `product_num` = '$num' WHERE `product_id` = '$id'";
}else{
    $sql = "INSERT INTO `cart`  (`product_id`,`product_img`,`product_name`,`product_price`,`product_num`)"
}

$result = mysqli_query($conn,$sql);
if($result){
    echo json_encode(array("code"=>1));
}
    echo json_encode(array("code"=>0));
?>