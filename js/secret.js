function replace(data, info1, info2, result1, result2) {
    if (data == info1) {
        data = result1;
    }
    if (data == info2) {
        data = result2;
    }
    return data;
}


function get() {
    // var username = document.getElementById("username").value;
    // var password = document.getElementById("password").value;
    var username = "admin";
    var password = "ILikeBBT2333333";
    var request = new XMLHttpRequest();
    request.open('POST', 'backend/admin.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "username=" + username + "&password=" + password;
    request.send(data);

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
                if (resultmsg.errcode == 0) {
                    for (var k in resultmsg.data.record) {
                        // var num = parseInt(k) + 1;
                        document.getElementById("record").innerHTML +=
                            '<tr>' +
                            '<td>' + resultmsg.data.record[k].name + '</td>' +
                            '<td>' + replace(resultmsg.data.record[k].gender, "male", "female", "男", "女") + '</td>' +
                            '<td>' + replace(resultmsg.data.record[k].grade, "gradeOne", "gradeTwo", "大一", "大二") + '</td>' +
                            '<td>' + resultmsg.data.record[k].college + '</td>' +
                            '<td>' + resultmsg.data.record[k].dormitory + '</td>' +
                            '<td>' + resultmsg.data.record[k].phone + '</td>' +
                            '<td>' + resultmsg.data.record[k].first + '</td>' +
                            '<td>' + resultmsg.data.record[k].second + '</td>' +
                            '<td>' + replace(resultmsg.data.record[k].adjust, "adjustYes", "adjustNo", "是", "否") + '</td>'
                        '</tr>';
                    }
                    for (var k in resultmsg.data.number) {
                        var num = parseInt(k) + 1;
                        var idname = "department" + num;
                        document.getElementById(idname).innerHTML +=
                            '<td>' + resultmsg.data.number[k].first + '</td>' +
                            '<td>' + resultmsg.data.number[k].second + '</td>';
                        // console.log(idname);
                    }
                }
            } else {
                alert('发生错误' + this.status);
            }
        }
    }


}