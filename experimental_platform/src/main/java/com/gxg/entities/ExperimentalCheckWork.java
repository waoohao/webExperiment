package com.gxg.entities;

import org.json.JSONObject;

public class ExperimentalCheckWork {
    private String courseId;
    private String studentId;
    private String studentName;
    private String signInTime;

    public String getCourseId() {
        return courseId;
    }

    public String getStudentId() {
        return studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getSignInTime() {
        return signInTime;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setSignInTime(String signInTime) {
        this.signInTime = signInTime;
    }

    @Override
    public String toString(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("courseId",this.courseId);
        jsonObject.accumulate("studentId",this.studentId);
        jsonObject.accumulate("studentName",this.studentName);
        jsonObject.accumulate("date",this.signInTime);
        return jsonObject.toString();
    }
}
