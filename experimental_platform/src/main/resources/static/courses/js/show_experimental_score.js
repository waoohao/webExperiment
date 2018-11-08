/**
 * Created by 郭欣光 on 2018/2/25.
 */

function getCourseInfo() {
    if(window.location.href.indexOf("?") != -1) {
        if(window.location.href.split("?")[1].indexOf("&") != -1) {
            if(window.location.href.split("?")[1].split("&")[0].indexOf("=") != -1) {
                var courseID = window.location.href.split("?")[1].split("&")[0].split("=")[1];
                var obj = new Object();
                obj.courseId = courseID;
                $.ajax({
                    url: "/get_course_info",
                    type: "POST",
                    cache: false,//设置不缓存
                    data: obj,
                    success: getCourseInfoSuccess,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
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
            } else {
                alert("无法获得课程信息！");
                window.location.href = "/courses/index.html";
            }
        } else {
            alert("无法获得课程信息！");
            window.location.href = "/courses/index.html";
        }
    } else {
        alert("无法获得课程信息！");
        window.location.href = "/index.html";
    }
}

function getCourseInfoSuccess(data) {
    if(data.indexOf("没有该课程！") == 0) {
        alert(data);
        window.location.href = "/courses/index.html";
    } else {
        var course = JSON.parse(data);
        document.getElementById("courseTab").innerHTML = "<a href=\"/courses/index.html?tag=" + course['tab'] + "&page=1\">" + course['tab'] + "</a>";
        document.getElementById("courseURL").innerHTML = "<a href=\"/courses/show.html?courseId=" + course['id'] + "\">" + course['name'] + "</a>";
        // document.getElementById("courseURL").href = "/courses/show.html?courseId=" + course['id'];
        // document.getElementById("courseURL").innerHTML = course['name'];
        document.getElementById("courseName").innerHTML = course['name'];
        document.getElementById("courseDescription").innerHTML = course['description'];
        var createTime = course['createTime'];
        var modificationTime = course['modificationTime'];
        createTime = createTime.split(".")[0];
        modificationTime = modificationTime.split(".")[0];
        document.getElementById("courseCreateTime").innerHTML = createTime;
        document.getElementById("courseModificationTime").innerHTML = modificationTime;
        document.getElementById("courseImg").src = "/user/course/img/" + course['img'];
        document.getElementById("courseImgMobile").src = "/user/course/img/" + course['img'];
        getCourseTeacherInfo(course['teacher']);
        getCoursesCount(course['teacher']);
    }
}

function getCourseTeacherInfo(teacherId) {
    var obj = new Object();
    obj.teacherId = teacherId;
    $.ajax({
        url: "/get_teacher_info",
        type: "POST",
        cache: false,//设置不缓存
        data: obj,
        success: getTeacherInfoSuccess,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function getTeacherInfoSuccess(data) {
    var teacher = JSON.parse(data);
    document.getElementById("courseTeacher").innerHTML = teacher['name'];
}

function getCoursesCount(teacherId) {
    var obj = new Object();
    obj.teacherId = teacherId;
    $.ajax({
        url: "/get_teacher_courses_count",
        type: "POST",
        cache: false,//设置不缓存
        data: obj,
        success: getCoursesCountSuccess,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function getCoursesCountSuccess(data) {
    document.getElementById("coursesCount").innerHTML = data;
}

function getCourseExperimentalTop5() {
    var courseId = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    var obj = new Object();
    obj.courseId = courseId;
    $.ajax({
        url: "/get_course_experimental_top5",
        type: "POST",
        cache: false,//设置不缓存
        data: obj,
        success: getCourseExperimentalTop5Success,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function getCourseExperimentalTop5Success(data) {
    if(data.indexOf("该课程暂时没有实验内容！") == 0) {
        document.getElementById("experimentalDocuments").innerHTML = data;
    } else {
        var str = "";
        var obj = JSON.parse(data);
        var experimentalDocumentList = obj.experimentalDocument;
        var courseId = window.location.href.split("?")[1].split("&")[0].split("=")[1];
        for(var i = 0; i < experimentalDocumentList.length; i++) {
            str += "<a href=\"/courses/show_experimental_information.html?courseId=" + experimentalDocumentList[i].courseId + "&experimentalId=" + experimentalDocumentList[i].id + "\">" + experimentalDocumentList[i].title + "</a>";
        }
        if(experimentalDocumentList.length >= 5) {
            str += "<a href=\"/courses/show.html?courseId=" + experimentalDocumentList[0].courseId + "\">查看更多</a>";
        }
        document.getElementById("experimentalDocuments").innerHTML = str;
    }
}

function getExperimentalInformation() {
    if(window.location.href.indexOf("?") != -1) {
        if(window.location.href.split("?")[1].indexOf("&") != -1) {
            if(window.location.href.split("?")[1].split("&")[1].indexOf("=") != -1) {
                var experimentalId = window.location.href.split("?")[1].split("&")[1].split("=")[1];
                var obj = new Object();
                obj.experimentalId = experimentalId;
                $.ajax({
                    url: "/get_experimental_information",
                    type: "POST",
                    cache: false,//设置不缓存
                    data: obj,
                    success: getExperimentalInformationSuccess,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
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
            } else {
                alert("无法获得实验内容！");
                window.location.href = "/courses/index.html";
            }
        } else {
            alert("无法获得实验内容！");
            window.location.href = "/courses/index.html";
        }
    } else {
        alert("无法获得实验内容！");
        window.location.href = "/courses/index.html";
    }
}

function getExperimentalInformationSuccess(data) {
    if(data.indexOf("error:") == 0) {
        alert(data.split("error:")[1]);
        window.location.href = "/courses/index.html";
    } else {
        var experimentalInformation = JSON.parse(data);
        document.title = experimentalInformation['title'] + " - Cloud Lab";
        document.getElementById("experimentalDocumentTitle").innerHTML = experimentalInformation['title'];
        if(experimentalInformation['content'].indexOf("pdf") == 0) {
            var windowHeight = window.screen.availHeight;
            var str = "<iframe id = \"experimentalDoc\" name=\"experimentalDoc\" frameborder=\"0\" src=\"" + experimentalInformation['experimentalUrl'] + "?experimentalNoCache=" + Math.random() + "\" height=\"" + (0.55 * windowHeight) + "px\" width=\"100%\" ></iframe>";
            document.getElementById("labs").innerHTML = str;
        } else {
            document.getElementById("labs").innerHTML = experimentalInformation['content'];
        }
    }
};

function getExperimentalScore(){
    if(window.location.href.indexOf("?") != -1) {
        if (window.location.href.split("?")[1].indexOf("&") != -1) {
            if (window.location.href.split("?")[1].split("&")[1].indexOf("=") != -1) {
                var experimentalId = window.location.href.split("?")[1].split("&")[1].split("=")[1];
                var obj = new Object();
                obj.experimentalId = experimentalId;
                $.ajax({
                    url: "/get_experimental_score",
                    type: "POST",
                    cache: false,//设置不缓存
                    data: obj,
                    success: getExperimentalScoreSuccess,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
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
            } else {
                alert("无法获得实验内容！");
                window.location.href = "/courses/index.html";
            }
        } else {
            alert("无法获得实验内容！");
            window.location.href = "/courses/index.html";
        }
    } else {
        alert("无法获得实验内容！");
        window.location.href = "/courses/index.html";
    }
};
function getExperimentalScoreSuccess(data){
    if(data.indexOf("没有该实验") != -1){
        alert(data);
        window.location.href = "/courses/index.html";
    }
    else {
        var tab = document.getElementById("scoreTable");
        var obj = JSON.parse(data);
        var experimentalReportList = obj;
        var str = "";
        //alert(experimentalReportList[1])
        str += "<div class=\"lab-item\"><div class=\"lab-item-title\" data-toggle=\"tooltip\" data-placement=\"bottom\" >姓名/学号 </div>";
        str += "<div class=\"pull-right lab-item-ctrl\">分数</div></div>"

        for (var i=0;i<experimentalReportList.length;i++){
            var experimentalReport = JSON.parse(experimentalReportList[i])
            if(experimentalReport["experimentalScore"] == undefined){
                experimentalReport["experimentalScore"] = "未评分";
            }
            str += "<div class=\"lab-item\"><div class=\"lab-item-title\" data-toggle=\"tooltip\" data-placement=\"bottom\" >"+ experimentalReport["studentName"] +"/"+ experimentalReport["studentId"]+"</div>";
            str += "<div class=\"pull-right lab-item-ctrl\">"+ experimentalReport["experimentalScore"]+"</div></div>"
        }
        tab.innerHTML = str;

    }
};

function printScore(oper){
    if (oper < 10){
        var bdhtml=window.document.body.innerHTML;//获取当前页的html代码
        var sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
        var eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
        var prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html
        var prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
        window.document.body.innerHTML=prnhtml;
        window.print();
        window.document.body.innerHTML=bdhtml;
    } else {
        window.print();
    }
};

$(document).ready(function () {
    getCourseInfo();
    getCourseExperimentalTop5();
    getExperimentalScore();
});
