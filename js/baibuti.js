

function setSelected(selectObj, optionsText) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text == optionsText) {
            selectObj.value = selectObj.options[i].value;
            selectObj.style.color = "rgb(51,51,51)";
        }
    }
}
const checkpath = 'backend/check.php';
const querypath = 'backend/query.php';

function check() {
    var name = encodeURIComponent(document.getElementById("name").value);
    var phone = encodeURIComponent(document.getElementById("phone").value);

    var xml = new XMLHttpRequest();
    xml.open('POST', checkpath, true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send("name=" + name + "&phone=" + phone);
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                var res = JSON.parse(xml.responseText);
                if (res.errcode == 0) {
                    // localStorage.localIndex = res.data;
                    location.href = "query.html";
                } else {
                    location.href = "queryfail.html";
                    // alert(res["msg"]);
                }
            }
        }
    }
}

function load() {
    var xml = new XMLHttpRequest();
    xml.open('POST', querypath, true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                var res = JSON.parse(xml.responseText);

                showName(res["name"]);
                showGender(res["gender"]);
                showGrade(res["grade"]);
                showType(res["type"]);
                showCollege(res["college"]);
                showDormitory(res["dormitory"]);
                showPhone(res["phone"]);
                showFirst(res["first"]);
                showSecond(res["second"], res["secondValue"]);
                showAdjust(res["adjust"]);
                showIntroduction(res["introduction"]);
                showGou();
            } else {
                alert("连接错误");
            }
        }
    }
}

if(window.loadData)
    window.onload = loadData.bind(this, load);

function showName(n) {
    var name = document.getElementById("name");
    var node = document.createTextNode(n);
    name.appendChild(node);
}

function showGender(g) {
    document.getElementById(g).checked = true;
    var gender = document.getElementById("gender");
    if (g == "male") {
        node = document.createTextNode("男");
    }
    else {
        node = document.createTextNode("女");
    }

    gender.appendChild(node);
}

function showGrade(g) {
    document.getElementById(g).checked = true;
    var grade = document.getElementById("grade");
    if (g == "gradeOne") {
        node = document.createTextNode("大一");
    }
    else {
        node = document.createTextNode("大二");
    }
    grade.appendChild(node);
}

function showType(c) {
    var type = document.getElementById("type");
    var node = document.createTextNode(c);
    type.appendChild(node);

    var select = document.getElementById("typeSelect");
    setSelected(select, c);
    updateTypeOpt();
}
function showCollege(c) {
    var college = document.getElementById("college");
    var node = document.createTextNode(c);
    college.appendChild(node);

    var select = document.getElementById("collegeSelect");
    setSelected(select, c);
}

function showDormitory(d) {
    var dormitory = document.getElementById("dormitory");
    var node = document.createTextNode(d);
    dormitory.appendChild(node);
}

function showPhone(p) {
    var phone = document.getElementById("phone");
    var node = document.createTextNode(p);
    phone.appendChild(node);
}



function showFirst(f) {
    var first = document.getElementById("first");
    var node = document.createTextNode(f);
    first.appendChild(node);

    var select = document.getElementById("firstSelect");
    setSelected(select, f);
}

function showSecond(s) {
    var second = document.getElementById("second");
    var node = document.createTextNode(s);
    second.appendChild(node);

    var select = document.getElementById("secondSelect");
    setSelected(select, s);
}

function showAdjust(a) {
    document.getElementById(a).checked = true;
    var adjust = document.getElementById("adjust");
    if (a == "adjustYes") {
        node = document.createTextNode("是");
    }
    else {
        node = document.createTextNode("否");
    }
    adjust.appendChild(node);
}

function showIntroduction(i) {
    var introduction = document.getElementById("introduction");
    var node = document.createTextNode(i);
    introduction.appendChild(node);
}

function showGou() {
    showGenderGou();
    showGradeGou();
    showAdjustGou();
}

function showGenderGou() {
    var male = document.getElementById("male");
    var female = document.getElementById("female");

    var maleGou = document.getElementById("maleGou");
    var femaleGou = document.getElementById("femaleGou");

    if (male.checked == true) {
        maleGou.style.opacity = 1;
    }
    else {
        maleGou.style.opacity = 0;
    }

    if (female.checked == true) {
        femaleGou.style.opacity = 1;
    }
    else {
        femaleGou.style.opacity = 0;
    }
}

function showGradeGou() {
    var gradeOne = document.getElementById("gradeOne");
    var gradeTwo = document.getElementById("gradeTwo");

    var gradeOneGou = document.getElementById("gradeOneGou");
    var gradeTwoGou = document.getElementById("gradeTwoGou");

    if (gradeOne.checked == true) {
        gradeOneGou.style.opacity = 1;
    }
    else {
        gradeOneGou.style.opacity = 0;
    }

    if (gradeTwo.checked == true) {
        gradeTwoGou.style.opacity = 1;
    }
    else {
        gradeTwoGou.style.opacity = 0;
    }
}

function showAdjustGou() {
    var adjustYes = document.getElementById("adjustYes");
    var adjustNo = document.getElementById("adjustNo");

    var adjustYesGou = document.getElementById("adjustYesGou");
    var adjustNoGou = document.getElementById("adjustNoGou");

    if (adjustYes.checked == true) {
        adjustYesGou.style.opacity = 1;
    }
    else {
        adjustYesGou.style.opacity = 0;
    }

    if (adjustNo.checked == true) {
        adjustNoGou.style.opacity = 1;
    }
    else {
        adjustNoGou.style.opacity = 0;
    }
}

function edit() {
    location.href = "#";
    editName();
    editGender();
    editGrade();
    editType();
    editCollege();
    editDormitory();
    editPhone();
    editFirst();
    editSecond();
    editAdjust();
    editIntroduction();

    buttonChange();
}

function editName() {
    var parent = document.getElementById("showName");
    var child = document.getElementById("name");

    var name = child.innerText;
    parent.removeChild(child);

    var input = document.createElement("input");
    input.setAttribute("class", "rightOfApply");
    input.setAttribute("value", name);
    input.setAttribute("type", "text");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("id", "name");

    parent.appendChild(input);
}

function editGender() {
    var showGender = document.getElementById("showGender");
    showGender.removeChild(document.getElementById("gender"));
    document.getElementById("1").style.display = "block";
    document.getElementById("1gou").style.display = "block";
}

function editGrade() {
    var showGrade = document.getElementById("showGrade");
    showGrade.removeChild(document.getElementById("grade"));
    document.getElementById("2").style.display = "block";
    document.getElementById("2gou").style.display = "block";
}

function editType() {
    var parent = document.getElementById("showType");
    var child = document.getElementById("type");

    parent.removeChild(child);

    document.getElementById("4").style.display = "block";
}

function editCollege() {
    var parent = document.getElementById("showCollege");
    var child = document.getElementById("college");

    parent.removeChild(child);

    document.getElementById("5").style.display = "block";
}

function editDormitory() {
    var parent = document.getElementById("showDormitory");
    var child = document.getElementById("dormitory");

    var dormitory = child.innerText;
    parent.removeChild(child);

    var input = document.createElement("input");
    input.setAttribute("class", "rightOfApply");
    input.setAttribute("value", dormitory);
    input.setAttribute("type", "text");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("id", "dormitory");

    window.dormInput = input;
    parent.appendChild(input);
}

function editPhone() {
    var parent = document.getElementById("showPhone");
    var child = document.getElementById("phone");

    var phone = child.innerText;
    parent.removeChild(child);

    var input = document.createElement("input");
    input.setAttribute("class", "rightOfApply");
    input.setAttribute("value", phone);
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "11");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("id", "phone");

    parent.appendChild(input);
}


function editFirst() {
    var parent = document.getElementById("showFirst");
    var child = document.getElementById("first");

    parent.removeChild(child);




    document.getElementById("6").style.display = "block";
}

function editSecond() {
    var parent = document.getElementById("showSecond");
    var child = document.getElementById("second");

    parent.removeChild(child);


    document.getElementById("7").style.display = "block";
}

function editAdjust() {
    var showAdjust = document.getElementById("showAdjust");
    showAdjust.removeChild(document.getElementById("adjust"));
    document.getElementById("3").style.display = "block";
    document.getElementById("3gou").style.display = "block";
}

function editIntroduction() {
    var introduction = document.getElementById("introduction");
    introduction.removeAttribute("disabled");
    introduction.style.border = "2px dashed rgb(69, 92, 222)";
}

function buttonChange() {
    var button = document.getElementById("edit");
    button.setAttribute("onclick", "modification()");
    button.innerText = "提交";

    var button = document.getElementById("back");
    button.setAttribute("onclick", "location.reload()");
}