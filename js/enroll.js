// 尝试封装
// function xhr(path, data) {
//     var request = new XMLHttpRequest();
//     request.open('POST', path, true);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send(data);
//     request.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
//                 // console.log(resultmsg);
//                 // return resultmsg;
//             } else {
//                 var resultmsg = [];
//                 resultmsg.errcode = -1;
//                 resultmsg.msg = '发生错误' + this.status;
//                 resultmsg.data = '';
//                 console.log(resultmsg);
//                 // return resultmsg;
//             }
//         }
//     }
// }
const showCollegepath = 'backend/showCollege.php';
const showDepartmentpath = 'backend/showDepartment.php';
//const showCollegepath = 'backend/showCollege.php';
const applypath = 'backend/apply.php';
const modificationpath = 'backend/modification.php';

var collegeData = [];
var departmentData = [];
var deptLimit = [[1,7,9,10,13],[0,1,2,3,5,7,8,9,10],[0,1,2,3,4,5,6,7,8]];
var infoBox = document.getElementById('infobox');
var centerer = document.getElementById('centerer');
var alertMsg = document.getElementById('alertMsg');
var alertButton = document.getElementById('alertButton');
var infobtn = document.getElementById('infobtn');
var dormInput = document.getElementById('dorm');
var limitLayer = document.getElementById('limit');
var deptopt1 = document.getElementById("firstdepartment"); 
var deptopt2 = document.getElementById("seconddepartment"); 
var typeopt = document.getElementById("typeoption");
var collopt = document.getElementById("collegeoption");
var submitBtn = document.getElementById("submit");
typeopt = (typeopt || document.getElementById("typeSelect"));
collopt = (collopt || document.getElementById("collegeSelect"));
deptopt1 = (deptopt1 || document.getElementById("firstSelect")); 
deptopt2 = (deptopt2 || document.getElementById("secondSelect")); 
submitBtn = (submitBtn || document.getElementById("edit"));

function sendHTTPReq(method, url, data){
    var request;                     
    if(window.XMLHttpRequest) request = new XMLHttpRequest();
    else request = new ActiveXObject("Microsoft.XMLHTTP");
    return new Promise(function(resolve,reject){
        request.onreadystatechange=function(){
            if(request.readyState===4)
                if(request.status===200)
                    resolve(request.response);
                else reject(request.status);
        };
        var arr = [];
        for(var key in data) arr.push(key + '=' + data[key]);
        var getData = arr.join("&");
        switch(method.toUpperCase()){
            case 'GET':
                request.open("GET",url+"?"+getData,true);
                request.send(null);
                break;
            case 'POST':
                request.open("POST",url,true);
                request.responseType="json";
                request.withCredentials = true;
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                request.send(getData);
                break;
        }
    });
};

//转义  元素的innerHTML内容即为转义后的字符  
function htmlEncode(str) {
    var ele = document.createElement('span');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
}
//解析   
function htmlDecode(str) {
    var ele = document.createElement('span');
    ele.innerHTML = str;
    return ele.textContent;
}
// xhr(path1, "");
dataLoaded = false;
function loadColleges(func){
    sendHTTPReq('POST',showCollegepath, {})
    .then(data=>{
        if (data&&!data.errcode) {
            collegeData=data.data; func && func();
        } else alert("发生错误！错误信息："+data.errcode);
    })
    //.catch(e=>alert("发生错误！错误信息："+e))
}

function loadDepartments(func){
    sendHTTPReq('POST',showDepartmentpath, {})
    .then(data=>{
        if (data&&!data.errcode) {
            departmentData=data.data; func && func();
        } else alert("发生错误！错误信息："+data.errcode);
    })
    //.catch(e=>alert("发生错误！错误信息："+e))
}
function loadData(func){
    if(dataLoaded) return; dataLoaded = true;
    loadColleges(loadDepartments.bind(this,func));
    /*
    sendHTTPReq('POST',showCollegepath, {})
    .then(data=>{
        if (data&&!data.errcode) {
            collegeData=data.data;
            sendHTTPReq('POST',showDepartmentpath, {})
            .then(data=>{
                if (data&&!data.errcode) {
                    departmentData=data.data;
                    func && func();
                }
                else alert("发生错误！错误信息："+data.errcode);
            })
            .catch(e=>alert("发生错误！错误信息："+e))
        }
        else alert("发生错误！错误信息："+data.errcode);
    })
    .catch(e=>alert("发生错误！错误信息："+e))*/
}
window.onload = loadData.bind(this,undefined);

if(alertButton){
    showAlert();
    function showAlert() {   
        centerer.style.display = 'block';
        alertWindow.style.animationName = 'alertShowAni';
        alertWindow.style.animationDuration = '0.2s';
        alertWindow.style.animationTimingFunction = 'ease-in-out';
        alertWindow.style.animationDelay = '0';
        alertWindow.style.animationFillMode = 'both';
        hideContent();
    }
    function hideAlert() {
        alertWindow.style.animationName = 'alertHideAni';
        alertWindow.style.animationDuration = '0.2s';
        alertWindow.style.animationTimingFunction = 'ease-in-out';
        alertWindow.style.animationDelay = '0';
        alertWindow.style.animationFillMode = 'both';
        showContent();
        setTimeout(function(){centerer.style.display = 'none';},200);
    }
    function showContent() {   
        infoBox.style.display = 'block';
        infoBox.style.animationName = 'contentShowAni';
        infoBox.style.animationDuration = '0.2s';
        infoBox.style.animationTimingFunction = 'ease-in-out';
        infoBox.style.animationDelay = '0';
        infoBox.style.animationFillMode = 'both';
    }
    function hideContent() {
        infoBox.style.animationName = 'contentHideAni';
        infoBox.style.animationDuration = '0.2s';
        infoBox.style.animationTimingFunction = 'ease-in-out';
        infoBox.style.animationDelay = '0';
        infoBox.style.animationFillMode = 'both';        
        setTimeout(function(){infoBox.style.display = 'none';},200);
    }
    alertButton.onclick = hideAlert;
    infobtn.onclick = showAlert;
}

function updateTypeOpt(){
    var value = typeopt.value;
    if(value==0) return hideLimitLayer();
    dormInput && (dormInput.placeholder = 
        (value==3 ? "如：东1-123" : 
        (value==1 ? "如：C1-101" : 
        "如：C1-101 或 东1-123")));
    var depts = deptLimit[value-1];
    updateDepts(depts);
    updateColls(value);
    showLimitLayer();
}
typeopt.onchange = updateTypeOpt;

function showLimitLayer(){
    limitLayer.style.display = "block";
    //enableSubmit();
}
function hideLimitLayer(){
    limitLayer.style.display = "none";
}
function enableSubmit(){
    submitBtn.disabled = false;
}
function disableSubmit(){
    submitBtn.disabled = true;
}

function updateDepts(depts){
    clearDepts();
    for(var i=0;i<depts.length;i++){
        deptopt1.options.add(new Option(
            departmentData[depts[i]].department, depts[i]+1));
        deptopt2.options.add(new Option(
            departmentData[depts[i]].department, depts[i]+1));
    }
}
function updateColls(type){
    clearColls();
    for(var i=0;i<collegeData.length;i++)
        if(collegeData[i].type == type)
            collopt.options.add(new Option(
                collegeData[i].college, 
                Number(collegeData[i].id)+1))
}
function clearDepts(){
    while(deptopt1.options.length)
        deptopt1.options.remove(0);
    while(deptopt2.options.length)
        deptopt2.options.remove(0);
    deptopt1.options.add(new Option("请选择", 0));
    deptopt2.options.add(new Option("选填", 0));
}
function clearColls(){
    while(collopt.options.length)
        collopt.options.remove(0);
    collopt.options.add(new Option("请选择", 0));
}

/*
var request = new XMLHttpRequest();
request.open('POST', showCollegepath, true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var data = "";
request.send(data);
request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
            if (resultmsg.errcode == 0) {
                for (var k in resultmsg.data) {
                    var num = parseInt(k) + 1;
                    // document.getElementById("collegeoption").innerHTML += '<option value="' + num + '">' + resultmsg.data[k] + '</option>';
                    document.getElementById("collegeoption").options.add(new Option(resultmsg.data[k], num)); //这个兼容IE与firefox 
                }
            }
        } else {
            alert('发生错误' + this.status);
        }
    }
}

//显示志愿
var request1 = new XMLHttpRequest();
request1.open('POST', showDepartmentpath, true);
request1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var data = "";
request1.send(data);
request1.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var resultmsg1 = JSON.parse(this.responseText);  // 将字符串转为数组
            if (resultmsg1.errcode == 0) {
                for (var k in resultmsg1.data) {
                    var num = parseInt(k) + 1;
                    document.getElementById("firstdepartment").options.add(new Option(resultmsg1.data[k], num)); //这个兼容IE与firefox 
                    document.getElementById("seconddepartment").options.add(new Option(resultmsg1.data[k], num)); //这个兼容IE与firefox 
                }
            }
        } else {
            alert('发生错误' + this.status);
        }
    }
}
*/

// encodeURIComponent()
//设置select的默认选中项颜色
$(function () {
    var unSelected = "#9e9e9e";
    var selected = "rgb(51,51,51)";
    $(function () {
        $("select").css("color", unSelected);
        $("option").css("color", selected);
        $("select").change(function () {
            var selItem = $(this).val();
            if (selItem == $(this).find('option:first').val())
                $(this).css("color", unSelected);
            else $(this).css("color", selected);
        });
    })
})


//返回按钮
function returnback() {
    window.location.href = "briefintroduction.html";
}

//获取单选框选的值
function getchoice(cname, choice1, choice2) {
    var radio = document.getElementsByName(cname);
    var selectvalue = null;   //  selectvalue为radio中选中的值
    for (var i = 0; i < radio.length; i++) 
        if (radio[i].checked == true) {
            selectvalue = radio[i].value;
            break;
        }
    // return selectvalue;
    return selectvalue ? choice2 : choice1;
    /*
    if (selectvalue == 0) {return choice1;
    } else if (selectvalue == 1) {
        return choice2;
    }*/
}

//获取选项所选的项的内容
function getselecttext(selectname) {
    // 拿到select对象： 
    var myselect = document.getElementById(selectname);
    // 拿到选中项的索引：
    var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
    //拿到选中项options的value： 
    // myselect.options[index].value;
    // 拿到选中项options的text： 
    var text = myselect.options[index] ?
        myselect.options[index].text : "请选择";
    return text;
}

// 提交功能
function submit() {
    //禁用按钮
    disableSubmit();

    var name = document.getElementById("name").value;
    var gender = getchoice("man", "male", "female");
    var grade = getchoice("grade", "gradeOne", "gradeTwo");
    var type = getselecttext("typeoption");
    var college = getselecttext("collegeoption");
    var dormitory = document.getElementById("dorm").value;
    var phone = document.getElementById("phonenum").value;
    var first = getselecttext("firstdepartment");
    var second = getselecttext("seconddepartment");
    var adjust = getchoice("choice", "adjustYes", "adjustNo");
    var introduction = document.getElementById("text").value;

    //调试用
    // console.log(name);
    // console.log(sex);
    // console.log(grade);
    // console.log(college);
    // console.log(dorm);
    // console.log(phonenum);
    // console.log(firstchoose);
    // console.log(secondchoose);
    // console.log(yorn);
    // console.log(selfintro);

    //名字只能汉字和·
    var restrictname = RegExp(/^[\u4e00-\u9fa5·]{2,20}$/);
    // console.log(restrictname.test(name));
    var namepro = restrictname.test(name);

    //宿舍，南校和北校命名规则
    // var restrictdorm = RegExp(/^[Cc][0-9Cc-]{6,7}$/);
    var restrictdorm1 = RegExp(/^[CD]([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i);
    var restrictdorm2 = RegExp(/^(东|西|北)[1-9] *-? *[1-9][0-9]{2} *$/);
    // console.log(restrictdorm.test(dorm));
    var dormpro = restrictdorm1.test(dormitory);
    if(!dormpro) dormpro = restrictdorm2.test(dormitory);

    //电话号码十一位且首位为1
    var restrictphonenum = RegExp(/^1[0-9]{10}$/);
    // console.log(restrictphonenum.test(phonenum));
    var phonenumpro = restrictphonenum.test(phone);

    //学院和一志愿不能为空
    //简介仅设置字数限制

    //二志愿可为空,并替换成空
    if (second == "选填") {
        second = "";
    }

    //最终判别
    var errmsg = 0;
    if (!namepro) errmsg = "名字格式错误！请输入汉字和\"·\"的组合";
    else if (type=="请选择") errmsg = "未选择专业类型！";
    else if (college=="请选择") errmsg = "学院未选择！";
    else if (!dormpro) errmsg = "宿舍格式填写错误！";
    else if (!phonenumpro) errmsg = "格手机式填写错误！";
    else if (first=="请选择") errmsg = "第一志愿未选择！";
    else if (introduction.length > 50) errmsg = "自我介绍过长！";
    if(errmsg) { alert(errmsg); enableSubmit(); return; }
    /*if (namepro == false || college == "请选择" || dormpro == false ||
        phonenumpro == false ||
        first == "请选择" || introduction.length > 50) {
        // alert("1");
    }*/

    data = {name, gender, grade, type, college, dormitory, 
        phone, first, second, adjust, introduction};
    //传送数据
    sendHTTPReq('POST', applypath, data)
    .then(data=>{
        if (!data.errcode) window.location.href = 'successpage.html';
        else {alert(data.msg); enableSubmit();}
    })
    .catch(e=>{alert("发生错误！错误信息："+e);
        console.error(e); enableSubmit();});
    /*
    var request = new XMLHttpRequest();
    request.open('POST', applypath, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data1 = "name=" + name +
        "&gender=" + sex +
        "&grade=" + grade +
        "&college=" + college +
        "&dormitory=" + dorm +
        "&phone=" + phonenum +
        "&first=" + firstchoose +
        "&second=" + secondchoose +
        "&adjust=" + yorn +
        "&introduction=" + selfintro;
    data = htmlEncode(data1);

    request.send(data);

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
                if (resultmsg.errcode == 0) {
                    // alert("get it!");
                    window.location.href = 'successpage.html';
                }
                else {
                    alert(resultmsg.msg);
                }

            } else {
                alert('发生错误' + this.status);

            }
        }
    }
    */
    // encodeURIComponent()
}


// 修改功能
function modification() {    
    //禁用按钮
    disableSubmit();

    var name = document.getElementById("name").value;
    var gender = getchoice("man", "male", "female");
    var grade = getchoice("grade", "gradeOne", "gradeTwo");
    var type = getselecttext("typeSelect");
    var college = getselecttext("collegeSelect");
    var dormitory = document.getElementById("dormitory").value;
    var phone = document.getElementById("phone").value;
    var first = getselecttext("firstSelect");
    var second = getselecttext("secondSelect");
    var adjust = getchoice("adjust", "adjustYes", "adjustNo");
    var introduction = document.getElementById("introduction").value;

    /*
    document.getElementById("submit").disabled=true;

    var name = document.getElementById("name").value;
    var sex = getchoice("gender", "male", "female");
    var grade = getchoice("grade", "gradeOne", "gradeTwo");
    var college = getselecttext("collegeSelect");
    var dorm = document.getElementById("dormitory").value;
    var phonenum = document.getElementById("phone").value;
    var firstchoose = getselecttext("firstSelect");
    var secondchoose = getselecttext("secondSelect");
    var yorn = getchoice("adjust", "adjustYes", "adjustNo");
    var selfintro = document.getElementById("introduction").value;
    */
    //调试用
    // console.log(name);
    // console.log(sex);
    // console.log(grade);
    // console.log(college);
    // console.log(dorm);
    // console.log(phonenum);
    // console.log(firstchoose);
    // console.log(secondchoose);
    // console.log(yorn);
    // console.log(selfintro);


    //名字只能汉字和·
    var restrictname = RegExp(/^[\u4e00-\u9fa5·]{2,20}$/);
    // console.log(restrictname.test(name));
    var namepro = restrictname.test(name);

    //宿舍，南校和北校命名规则
    // var restrictdorm = RegExp(/^[Cc][0-9Cc-]{6,7}$/);
    var restrictdorm1 = RegExp(/^[CD]([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i);
    var restrictdorm2 = RegExp(/^(东|西|北)[1-9] *-? *[1-9][0-9]{2}/);
    // console.log(restrictdorm.test(dorm));
    var dormpro = restrictdorm1.test(dormitory);
    if(!dormpro) dormpro = restrictdorm2.test(dormitory);

    //电话号码十一位且首位为1
    var restrictphonenum = RegExp(/^1[0-9]{10}$/);
    // console.log(restrictphonenum.test(phonenum));
    var phonenumpro = restrictphonenum.test(phone);



    //名字只能汉字和·
    /*
    var restrictname = RegExp(/^[\u4e00-\u9fa5·]{2,20}$/);
    console.log(restrictname.test(name));
    var namepro = restrictname.test(name);

    //宿舍，南校和北校命名规则
    // var restrictdorm = RegExp(/^[Cc][0-9Cc-]{6,7}$/);
    var restrictdorm = RegExp(/^[CD]([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i);
    console.log(restrictdorm.test(dorm));
    var dormpro = restrictdorm.test(dorm);

    //电话号码十一位且首位为1
    var restrictphonenum = RegExp(/^1[0-9]{10}$/);
    console.log(restrictphonenum.test(phonenum));
    var phonenumpro = restrictphonenum.test(phonenum);
    */
    //简介仅设置字数限制
    // if (selfintro.length > 50) {
    //     console.log("超过字数限制");
    //     // alert("信息填写有误或不完整,请正确填写您的信息哦亲");
    // }

    //二志愿可为空,并替换成空
    if (second == "选填") {
        second = "";
    }

    //一志愿和学院不能为空
    // if(firstchoose="请选择" ||){}

    // if (restrictphonenum.test(phonenum) == false) {
    //     console.log("电话输入有误");
    //     alert("信息填写有误或不完整,请正确填写您的信息哦亲");
    // }

    //最终判别
    var errmsg = 0;
    if (!namepro) errmsg = "名字格式错误！请输入汉字和\"·\"的组合";
    else if (type=="请选择") errmsg = "未选择专业类型！";
    else if (college=="请选择") errmsg = "学院未选择！";
    else if (!dormpro) errmsg = "宿舍格式填写错误！";
    else if (!phonenumpro) errmsg = "格手机式填写错误！";
    else if (first=="请选择") errmsg = "第一志愿未选择！";
    else if (introduction.length > 50) errmsg = "自我介绍过长！";
    if(errmsg) { alert(errmsg); enableSubmit(); return; }
    /*
    if (namepro == false || college == "请选择" || dormpro == false || phonenumpro == false ||
        first == "请选择" || introduction.length > 50) {
        alert("信息填写有误或不完整,请正确填写您的信息哦亲");
        // alert("1");
        // document.getElementById("submit").disabled=false;
        return;
    }*/
    // alert("get it!");

    data = {name, gender, grade, type, college, dormitory, 
        phone, first, second, adjust, introduction};
    //传送数据
    sendHTTPReq('POST', modificationpath, data)
    .then(data=>{
        if (!data.errcode) window.location.href = 'alterok.html';
        else {alert(data.msg); enableSubmit();}
    })
    .catch(e=>{alert("发生错误！错误信息："+e);
        console.error(e); enableSubmit();});

    //传送数据
    /*
    var request = new XMLHttpRequest();
    request.open('POST', modificationpath, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data1 = "name=" + name +
        "&gender=" + sex +
        "&grade=" + grade +
        "&college=" + college +
        "&dormitory=" + dorm +
        "&phone=" + phonenum +
        "&first=" + firstchoose +
        "&second=" + secondchoose +
        "&adjust=" + yorn +
        "&introduction=" + selfintro;
    data = htmlEncode(data1);    

    request.send(data);

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
                if (resultmsg.errcode == 0) {
                    // alert(this.responseText);
                    location.href = "alterok.html";
                } else {
                    alert(resultmsg.msg);
                }
            } else {
                alert('发生错误' + this.status);
            }
        }
    }*/
    // encodeURIComponent()
}
