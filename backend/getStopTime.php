<?php

require 'config.php';

$time = [
	'1'=>$ini['stoptime1'],
	'2'=>$ini['stoptime1'],
	'3'=>$ini['stoptime2_']
];
$result = [
    "errcode" => 0,
    "msg" => '',
    "data" => $time
];

echo json_encode($result);
?>