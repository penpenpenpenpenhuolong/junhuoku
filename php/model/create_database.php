<?php

// require('./connect.php');
header('content-type:text/html;charset=utf8');
$conn = mysqli_connect('127.0.0.1','root','root');

//创建数据库
$sql = "CREATE DATABASE shop";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据库创建成功";
}else{
	echo "数据库创建失败";
}

?>