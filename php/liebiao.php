<?php
header('content-type:application/json;charset=utf-8');
//读取json数据
    $jsonString=file_get_contents('../js/liebiao.json');
//返回读取数据
    echo $jsonString;

?>