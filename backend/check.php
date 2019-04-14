<?php
session_start();

require "config.php";

    
$name=$_POST["name"];
$phone=$_POST["phone"];

judgeNull($name,"姓名");
judgeNull($phone,"手机号");

judgeName($name);
// judgePhone($phone);


//判断是否报名过
$sql="SELECT * FROM information WHERE phone=? AND `name`=?";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"ss",$phone,$name);
mysqli_execute($stmt);
$res=mysqli_stmt_get_result($stmt);

$row=mysqli_fetch_array($res);

if($row==null){
    $result=[
        "errcode" => 7,
        "msg" => "报名系统没有您的信息，快去报名吧",  
        "data" => ""
    ];
    echo json_encode($result);
    exit;
}


$result=[
    "errcode" => 0,
    "msg" => "",
    "data" => $row
];

$_SESSION["id"] = $row["id"];

echo json_encode($result);









?>
