<?php

include_once('./realconfig.php');

$department = ['技术部', '行政部', '人力资源部', '综合新闻部', '频道资讯部', '市场拓展部', '视觉设计部', '策划推广部', '节目部', '编辑部', '视频部', '形象推广部'];

$conn = new mysqli($ini['servername'], $ini['username'], $ini['password'], $ini['dbname']);
if($conn->connect_error) {
   die("error happened while connect db");
}

$data = [];

foreach($department as $value) {
   $sql = 'select "'.$value.'", (select count(*) from information where id>42 and first like %'.$value .'%) as first, (select count(*) from information where id>42 and second like %'.$value.'%) as second;';
   $res = $conn->query($sql);
   if($res->num_rows > 0) {
      $row = $res->fetch_assoc();
      array_push($data, $row);
   }
}

echo encode_json($data);

$conn->close();

exit;
