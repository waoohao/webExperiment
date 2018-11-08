package com.gxg.services;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;

/**
 * Created by 郭欣光 on 2017/12/27.
 */

@Service
public class MD5Service {


    /**
     *
     *  md5加密算法
     */
    public String md5 (String s) {
        char hexDigits[] = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
        try {
            byte[] strTemp = s.getBytes();
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(strTemp);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for(int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        }catch(Exception e) {
            return null;
        }
    }
}
