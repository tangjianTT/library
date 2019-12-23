package com.neusoft.library.modules.sys.utils;


import org.apache.commons.mail.HtmlEmail;


public class EmailVerificationCodeUtils {
    //邮箱验证码
    public static String sendEmail(String emailAddress){
        String code = CommonUtils.getRandomCode();
        try {
            HtmlEmail email = new HtmlEmail();//不用更改
            email.setHostName("smtp.qq.com");//需要修改，126邮箱为smtp.126.com,163邮箱为163.smtp.com，QQ为smtp.qq.com
            email.setCharset("UTF-8");
            email.addTo(emailAddress);// 收件地址

            email.setFrom("1329025765@qq.com", "图书馆借阅系统平台");//此处填邮箱地址和用户名,用户名可以任意填写
            // 使用第三方客户端登录授权码：xvdyzzgbbknsbcff
            email.setAuthentication("1329025765@qq.com", "dlkgfhsjrexzjefc"); //此处填写邮箱地址和客户端授权码

            email.setSSLOnConnect(true);
            email.setSubject("图书馆借阅系统平台党建注册验证码");//此处填写邮件名，邮件名可任意填写
            email.setMsg("尊敬的用户，您的验证码为：" + code + "，请勿泄露于他人！5分钟内有效！");//此处填写邮件内容

            email.send();
            return code;
        }
        catch(Exception e){
            e.printStackTrace();
            return "";
        }
    }
}
