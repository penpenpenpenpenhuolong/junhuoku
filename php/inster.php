<?php

header('content-type:text/html;charset=utf8');

$user=$_GET['name'];
$psd=$_GET['psd'];

$conn=mysqli_connect('127.0.0.1','root','root','user');


// mysqli_set_charset($conn,);


$sql="INSERT INTO `info` VALUES (null,'$user','$psd')";

$res=mysqli_query($conn,$sql);


mysqli_close($conn);

if($res){
    echo "1";
}else{
    echo "0";
}
?>