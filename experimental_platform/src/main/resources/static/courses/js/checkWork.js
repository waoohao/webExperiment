/*
create by 吴宇昊
2018.10.11
 */


function getCheckWorkTableByMouth() {
    //alert(document.getElementById("date").value);
    var courseId = location.href.split("?")[1].split("=")[1];
    var obj = new Object();
    obj.year = document.getElementById("date_year").innerText;
    obj.mouth = document.getElementById("date_mouth").innerText;
    obj.courseId = courseId;
    $.ajax({
        url:"/get_check_work_data",
        type:"POST",
        data:obj,
        cache:false,
        success:getCheckWorkTableByMouthSuccess,
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status >= 400 && XMLHttpRequest.status < 500) {
                alert("客户端请求出错！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
            } else {
                if (XMLHttpRequest.status >= 500 || XMLHttpRequest.status <= 600) {
                    alert("服务器出错！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                } else {
                    if (XMLHttpRequest.status >= 300 || XMLHttpRequest.status < 400) {
                        alert("重定向问题！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                    } else {
                        alert("抱歉，系统好像出现一些异常！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                    }
                }
            }
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}



function getCheckWorkTableByMouthSuccess(data) {
    var obj = JSON.parse(data);
    var year = document.getElementById("date_year").innerText;
    var mouth = document.getElementById("date_mouth").innerText;
    //获得当月第一天的星期数
    var date = new Date(year,mouth,"1");
    firstweekday = date.getDay();
    date.setFullYear(year,mouth,"0");
    //这个月一共多少天
    daysInMouth = date.getDate();
    var str = ""
    // str += "<table class=\"table\" style='width:75%'>";
    // str += "<thead><tr>";
    // for(var i=0;i<=daysInMouth;i++){
    //     if(i == 0){
    //         str += "<th>姓名</th>";
    //     }
    //     str += "<th>" + (i+1).toString() + "</th>";
    // }
    // str += "</tr></thead>";
    // str += "</table>";
    var datamap = {};
    for(var i=0;i<obj.length;i++){
        var m = JSON.parse(obj[i])
        if(m.studentName in datamap){
            datamap[m.studentName].days ++;
            datamap[m.studentName].dateList.push(m.date);

        }else{
            datamap[m.studentName] = {};
            datamap[m.studentName].days = 1;
            datamap[m.studentName].dateList = [m.date];
            datamap[m.studentName].courseId = m.courseId;
            datamap[m.studentName].studentId = m.studentId;
        }
    }
    str += "<table class=\"table\"><thead>" +
        "<tr>" +
        "<th>姓名</th>" +
        "<th>学号</th>" +
        "<th>出勤天数</th>" +
        "<th>出勤率</th></tr></thead>";
    for (var key in datamap){
        str += "<tr>" +
            "<th>" + key + "</th>" +
            "<th>"+ datamap[key].studentId+"</th>" +
            "<th>"+ datamap[key].days+"</th>" +
            "<th>"+ (datamap[key].days/(daysInMouth-8) * 100).toFixed(2) +"%</th></tr>";
    }
    str += "</table>";


    document.getElementById("check-work-table").innerHTML = str;

}
function takeToExcel() {
    var courseId = location.href.split("?")[1].split("=")[1];
    var obj = new Object();
    obj.year = document.getElementById("date_year").innerText;
    obj.mouth = document.getElementById("date_mouth").innerText;
    obj.courseId = courseId;
    $.ajax({
        url:"/get_check_work_data",
        type:"POST",
        data:obj,
        cache:false,
        success:takeToExcelSuccess,
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status >= 400 && XMLHttpRequest.status < 500) {
                alert("客户端请求出错！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
            } else {
                if (XMLHttpRequest.status >= 500 || XMLHttpRequest.status <= 600) {
                    alert("服务器出错！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                } else {
                    if (XMLHttpRequest.status >= 300 || XMLHttpRequest.status < 400) {
                        alert("重定向问题！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                    } else {
                        alert("抱歉，系统好像出现一些异常！错误代码（" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus + "）");
                    }
                }
            }
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}

function takeToExcelSuccess(data) {
    var obj = JSON.parse(data);
    var year = document.getElementById("date_year").innerText;
    var mouth = document.getElementById("date_mouth").innerText;
    //获得当月第一天的星期数
    var date = new Date(year,mouth,"1");
    firstweekday = date.getDay();
    date.setFullYear(year,mouth,"0");
    //这个月一共多少天
    daysInMouth = date.getDate();
    var datamap = {};
    for(var i=0;i<obj.length;i++){
        var m = JSON.parse(obj[i])
        if(m.studentName in datamap){
            datamap[m.studentName].days ++;
            datamap[m.studentName].dateList.push(m.date);

        }else{
            datamap[m.studentName] = {};
            datamap[m.studentName].days = 1;
            datamap[m.studentName].dateList = [m.date];
            datamap[m.studentName].courseId = m.courseId;
            datamap[m.studentName].studentId = m.studentId;
        }
    }
    var jsondata = []
    for (var key in datamap){
        var ls = [];
        ls.push(key);
        for(var j = 0;j<daysInMouth;j++){
            dayList = []
            for (var i=0;i<datamap[key].dateList.length;i++){
                var d = parseInt(datamap[key].dateList[i].split('-')[2]);
                dayList.push(d);
            }
            console.log(dayList);
            if (dayList.indexOf(j+1) != -1){
                ls.push("√");
            }
            else {
                ls.push("×");
            }
        }
        jsondata.push(ls);
    }

    var str = "<thead>"+year+"年"+mouth+"月出勤统计表</thead>"
    var worksheet = year+"年"+mouth+"月"+"考勤表";
    var uri = 'data:application/vnd.ms-excel;base64,';
    str += "<tr><th>姓名\\日期</th>";
    for (var i=0;i<daysInMouth;i++){
        str += "<th>"+ String(i+1)+"日"+"</th>";
    }
    str += "</tr>";
    for(let i = 0 ; i < jsondata.length ; i++ ){
        str+='<tr>';
        for(var j = 0;j <jsondata[i].length;j++){
            //增加\t为了不让表格显示科学计数法或者其他格式
            str+=`<td>${ jsondata[i][j] + '\t'}</td>`;
        }
        str+='</tr>';
    }
    //下载的表格模板数据
    var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
    //下载模板
    window.location.href = uri + base64(template)


}

function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }