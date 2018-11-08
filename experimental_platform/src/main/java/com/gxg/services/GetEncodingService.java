package com.gxg.services;

import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

/*
create by 吴宇昊 2018.10.16
 */
@Service
public class GetEncodingService {


   public String getEncoding(String str){
        String encoding = "UTF-8";
        try {
            if (str.equals(new String(str.getBytes(),encoding))) {
                return encoding;
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        encoding = "GBK";
        try {
            if (str.equals(new String(str.getBytes(),encoding))) {
                return encoding;
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        encoding = "ISO-8859-1";
        try {
            if (str.equals(new String(str.getBytes(),encoding))) {
                return encoding;
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        encoding = "GB2312";
        try {
            if (str.equals(new String(str.getBytes(),encoding))) {
                return encoding;
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }
}
