<?php

include "realconfig.php";
session_start();

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

//服务器
//$ini=parse_ini_file("login.ini");
$con=mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
// $con=mysqli_connect("localhost","root","Continue.LJL666","baibuti");
mysqli_query($con,"SET NAMES utf8mb4");

//本地
// $con=mysqli_connect("localhost","root","","baibuti");

// if(!$con){
//     $result=["code" => 1, "msg" => "连接出错", "data" => ""];
// }

// else{

// $name=$_SESSION["name"];
// $phone=$_SESSION["phone"];
$id=$_SESSION["id"];

// $sql="SELECT * FROM information WHERE `name`=? AND phone=?";
$sql="SELECT * FROM information WHERE `id`=?";
$stmt=mysqli_prepare($con,$sql);
// mysqli_stmt_bind_param($stmt,"ss",$name,$phone);
mysqli_stmt_bind_param($stmt,"i",$id);
mysqli_execute($stmt);

$res=mysqli_stmt_get_result($stmt);
$row=mysqli_fetch_array($res);

// $result=["code" => 0, "msg" =>"",
//          "data" =>
//          [
//              "name" => $row["name"],
//              "gender" => $row["gender"],
//              "grade" => $row["grade"],
//              "college" => $row["college"],
//              "dormitory" => $row["dormitory"],
//              "phone" => $row["phone"],
//              "first" => $row["first"],
//              "second" => $row["second"],
//              "adjust" => $row["adjust"],
//              "introduction" => $row["introduction"]
//          ]
//         ];
// }
$_SESSION["row"]=$row;

echo json_encode($row);
mysqli_close($con);





?>
