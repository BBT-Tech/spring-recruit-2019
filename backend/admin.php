<?php

require "config.php";


$username=$_POST["username"];
$password=$_POST["password"];

judgeNull($username,"账号");
judgeNull($password,"密码");

$sql="SELECT `password` FROM `admin` WHERE username=?";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"s",$username);
mysqli_execute($stmt);

$res=mysqli_stmt_get_result($stmt);
$row=mysqli_fetch_array($res);


if($password != $row["password"]){
    $result = [
        "errcode" => 3,
        "msg" => "账号或密码错误",
        "data" => ""
    ];
    echo json_encode($result);
    exit;
}



//统计各部门第一第二志愿人数
$department=show($con,"department");
$num=array();
for($i=0; $i < sizeof($department); ++$i){
    $sql="SELECT * FROM information WHERE `first`='$department[$i]'";
    $res=mysqli_query($con,$sql);
    $arr=array();
    while($row=mysqli_fetch_array($res)){
        $arr[] = $row;
    }
    $vol["first"] = sizeof($arr);

    $sql="SELECT * FROM information WHERE `second`='$department[$i]'";
    $res=mysqli_query($con,$sql);
    $arr=array();
    while($row=mysqli_fetch_array($res)){
        $arr[] = $row;
    }
    $vol["second"] = sizeof($arr);

    // $num["$department[$i]"]=$vol;
    $num["$i"]=$vol;
}


//显示报名记录
$sql="SELECT * FROM information";
$res=mysqli_query($con,$sql);
$record=array();
while($row=mysqli_fetch_array($res)){
    $record[]=$row;
}


//合并 各部门志愿人数 和 报名记录
$data=array();
$data["number"] = $num;
$data["record"] = $record;


$result = [
    "errcode" => 0,
    "msg" => "",
    "data" => $data
];




echo json_encode($result);





?>