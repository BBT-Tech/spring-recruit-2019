<?php
$ini=parse_ini_file("login.ini");

header('Content-Type: application/json');


$con=mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);

if(!$con){
    $result = [
        "errcode" => 1,
        "msg" => "连接错误",
        "data" => ""
    ];
    echo json_encode($result);
    exit;
}
mysqli_query($con,"SET NAMES utf8mb4");

//查询数据库中的学院或部门并显示
function show($con,$table){
    $sql="SELECT * FROM $table";
    $res=mysqli_query($con,$sql);
    //return mysqli_fetch_array($res);
    while($row=mysqli_fetch_array($res)){
        $arr[]=$row;
    }
    return $arr;
}





//判断是否为空
function judgeNull($judge,$information){
    if($judge != null){
        return;
    }
    
    $result = [
        "errcode" => 2,
        "msg" => "请输入您的$information",
        "data" => ""
    ];
    echo json_encode($result);
    exit;
}

//判断名字是否符合规范（2-8个汉字）
function judgeName($name){
    $pattern="/^[\x{4e00}-\x{9fa5}]{2,8}$/u";
    if(!preg_match($pattern,$name)){
        $result = [
            "errcode" => 3,
            "msg" => "请输入正确的姓名",
            "data" => ""
        ];
        echo json_encode($result);
        exit;
    }
}

//判断宿舍是否符合规范
function judgeDormitory($dormitory){
    $pattern1="/^([CD]([1-9]|1[0-7])|(西|东)[1-9]) *-? *[1-9][0-9]{2} *$/i";
    $pattern2="/^(东|西|北)[1-9] *-? *[1-9][0-9]{2} *$/";
    if(!preg_match($pattern1,$dormitory)
        && !preg_match($pattern2,$dormitory)){
            $result = [
                "errcode" => 4,
                "msg" => "请输入规范宿舍格式",
                "data" => ""
            ];
            echo json_encode($result);
            exit;
    }
}

//判断手机号是否符合规范
function judgePhone($phone){
    //$pattern="/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/";
    $pattern = "/^1[0-9]{10}$/";
    if(!preg_match($pattern,$phone)){
        $result = [
            "errcode" => 5,
            "msg" => "请输入正确的手机号",
            "data" => ""
        ];
        echo json_encode($result);
        exit;
    }
}

//判断个人介绍是否符合规范
function judgeIntroduction($introduction){
    if(iconv_strlen($introduction,"utf-8") > 50){
        $result = [
            "errcode" => 6,
            "msg" => "个人介绍不能超过50字",
            "data" => ""
        ];
        echo json_encode($result);
        exit;
    }
}

//核对信息与数据库中的学院或部门信息是否一致
function judgeTable($con,$table,$data){
    $c=show($con,$table);
    for($i=0; $i < sizeof($c); ++$i){
        if($data == $c[$i][$table]){
            return;
        }
    }

    if($table == "college"){
        $string="学院";
    }
    else{
        $string="部门";
    }
    $result = [
        "errcode" => 10,
        "msg" => "请输入正确的$string",
        "data" => ""
    ];
    echo json_encode($result);
    exit;
}



?>
