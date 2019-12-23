package com.neusoft.library.modules.sys.utils;



import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class CommonUtils {
    /**
     * 获取 UUID
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString();
    }

    public static Timestamp getCurrentTimestamp(){
        return new Timestamp(System.currentTimeMillis());
    }

    public static String formatTime(Timestamp time){
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        return format.format(time);
    }

    public static String formatTimeWithoutSec(Timestamp time){
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH:mm");
        return format.format(time);
    }

    public static Timestamp toTimestamp(String time) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        Timestamp timestamp = new Timestamp(format.parse(time).getTime());
        return timestamp;
    }

    public static Timestamp toTimestampWithoutSec(String time) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH:mm");
        Timestamp timestamp = new Timestamp(format.parse(time).getTime());
        return timestamp;
    }

    public static Long dateMillis(String time) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日");
        long dateMillis = format.parse(time).getTime();
        return dateMillis;
    }

    public static Long getNowDateMillis() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日");
        String timeStr = format.format(System.currentTimeMillis());
        return dateMillis(timeStr);
    }

    public static String getRandomCode(){
        return  String.valueOf((int) ((Math.random())*900000+100000));
    }
}
