package com.gxg.entities;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Timestamp;

/**
 * Created by 郭欣光 on 2018/3/27.
 */

public class ExperimentalReport {
    private String id;
    private String name;
    private String title;
    private String experimentalId;
    private  String studentId;
    private Timestamp createTime;
    private  String experimentalScore;
    private  String studentName;

    public String getStudentName() { return studentName; }

    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getExperimentalScore() {
        return experimentalScore;
    }

    public void setExperimentalScore(String experimentalScore) {
        this.experimentalScore = experimentalScore;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
    public String getStudentId() {
        return studentId;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExperimentalId() {
        return experimentalId;
    }

    public void setExperimentalId(String experimentalId) {
        this.experimentalId = experimentalId;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }


    @Override
    public String toString() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("id",id);
        jsonObject.accumulate("studentName",studentName);
        jsonObject.accumulate("studentId",studentId);
        jsonObject.accumulate("experimentalId",experimentalId);
        jsonObject.accumulate("experimentalScore",experimentalScore);
        jsonObject.accumulate("name",name);
        jsonObject.accumulate("title",title);
        jsonObject.accumulate("createTime",createTime);
        return jsonObject.toString();
    }

}

