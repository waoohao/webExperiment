package com.gxg.dao;

/*
create by 吴宇昊
2018.10.11
 */

import com.gxg.entities.ExperimentalCheckWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Repository
public class ExperimentalCheckWorkDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String insertSignIn(ExperimentalCheckWork experimentalCheckWork) {
        String name = null;
        try {
            String sql = "select studentName from experimentalcheckwork where signInTime=? and courseId=? and studentId=?";
            name = jdbcTemplate.queryForObject(sql,String.class,experimentalCheckWork.getSignInTime(),experimentalCheckWork.getCourseId(),experimentalCheckWork.getStudentId());
        }catch (Exception e){ }
        if(experimentalCheckWork.getStudentName().equals(name) ){
            return "请勿重复签到";
        }else{
            String sql = "insert into experimentalcheckwork value(?,?,?,?)";
            //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            //Date date = null;
            //try {
            //date = sdf.parse(experimentalCheckWork.getSignInTime());
            jdbcTemplate.update(sql,
                    experimentalCheckWork.getStudentId(),
                    experimentalCheckWork.getStudentName(),
                    experimentalCheckWork.getCourseId(),
                    experimentalCheckWork.getSignInTime());
            //   }catch (ParseException e){
            //     e.printStackTrace();
            //}
            return "签到成功";
        }
    }

    public List<ExperimentalCheckWork> getCheckWorkDateByDateString(String dateString,String courseId){
        String sql = "select * from experimentalcheckwork where signInTime>=? and signInTime<=? and courseId=?";
        List<ExperimentalCheckWork> list = jdbcTemplate.query(sql, new RowMapper<ExperimentalCheckWork>() {
            @Override
            public ExperimentalCheckWork mapRow(ResultSet resultSet, int i) throws SQLException {
                ExperimentalCheckWork experimentalCheckWork = new ExperimentalCheckWork();
                experimentalCheckWork.setSignInTime(resultSet.getString("signInTime"));
                experimentalCheckWork.setStudentName(resultSet.getString("studentName"));
                experimentalCheckWork.setStudentId(resultSet.getString("studentId"));
                experimentalCheckWork.setCourseId(resultSet.getString("courseId"));
                return experimentalCheckWork;
            }
        },dateString+"-"+"1",dateString+"-"+31,courseId);
        return list;
    }
}

