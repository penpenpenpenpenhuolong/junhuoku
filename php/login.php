<?php
header('content-type:text/html;charset=utf8');
//连接数据库
$conn=mysqli_connect('127.0.0.1','root','root','user');
//设置编码
// mysqli_set_charset($conn,'utf8');
$user=$_GET['name'];
$psd=$_GET['psd'];
//SQL语句
$sql="SELECT * FROM `info` WHERE `name`='$user' AND `psd`='$psd'";


//执行SQL语句
$result=mysqli_query($conn,$sql);
$jx=mysqli_fetch_assoc($result);
//判断结果集是都存在数据
if($jx){
   echo "1";

}else{
    echo '0';
}
?>