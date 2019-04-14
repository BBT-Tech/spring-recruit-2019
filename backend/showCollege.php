<?php

require "config.php";


//查询学院
$res = show($con,"college");

$result = [
    "errcode" => 0,
    "msg" => "",
    "data" => $res
];

echo json_encode($result);
















?>