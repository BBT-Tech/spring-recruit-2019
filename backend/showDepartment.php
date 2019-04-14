<?php

require "config.php";


//查询宿舍
$res = show($con,"department");
$result = [
    "errcode" => 0,
    "msg" => "",
    "data" => $res
];
echo json_encode($result);



?>