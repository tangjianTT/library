jQuery(document).ready(function($) {
    var verificationCode;
    /*var checkUserName = /^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$/; //用户名*/
    /*var checkPassword = /^.*[A-Za-z0-9\\w_-]+.*$/; //密码*/
    var checkPassword = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    var checkPhoneNumber = /^0?(13|15|18|17)[0-9]{9}$/; //手机号
    var checkEmail =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件

	$('#login').on("click", function(){
		$('.theme-popover-mask').fadeIn(100);
		$('.login').slideDown(200);
	})
	$('#register').on("click", function(){
		$('.theme-popover-mask').fadeIn(100);
		$('.register').slideDown(200);
	})
	$('.theme-poptit .close').on("click", function(){
		$('.theme-popover-mask').fadeOut(100);
		$('.theme-popover').slideUp(200);
	})

	$('#to-register').on("click", function(){
		$('.theme-popover').slideUp(200);
		$('.theme-popover-mask').fadeIn(100);
		$('.register').slideDown(200);
	})
	
	$('#to-login').on("click", function(){
		$('.theme-popover').slideUp(200);
		$('.theme-popover-mask').fadeIn(100);
		$('.login').slideDown(200);
	})

    // user login
    $('#userLogin').on('click', function() {
        var phoneOrEmail = $('#phoneOrEmail').val().trim();
        var password = $('#password').val().trim();
        var phone;
        var email;
        var isPhone; // 1:是手机号，0:邮箱
        if (phoneOrEmail != null && phoneOrEmail != ''){
        // 验证手机或邮箱
            if(!checkPhoneNumber.test(phoneOrEmail) && !checkEmail.test(phoneOrEmail)) {
                layer.msg("请填写正确的手机或邮箱", function (){});
                return false;
            }
        } else {
            layer.msg("手机号或邮箱不能为空", function (){});
            return false;
        }
        if(password != null && password != ''){
            if (password.length < 8 || password.length > 20){
                layer.msg("密码错误");
                return false;
            }
        } else {
            layer.msg("密码不能为空", function (){});
            return false;
        }
        $.ajax({
            type : "POST",
            url : "${ctx}/sys/font/login",
            dataType:"json", //返回的数据类型
            /*contentType: "application/json; charset=utf-8",*/
            data:{
                    "phoneOrEmail" : phoneOrEmail,
                    "password" : password,
            },
            success:function(result){
                switch(result.code) {
                    case 0:
                        layer.msg("登陆成功");
                        setTimeout(location.reload(), 500);
                        break;
                    case 1:
                        layer.msg("账号或密码错误");
                        break;
                    case 2:
                        layer.msg("账号被禁用");
                        break;
                    default:
                        break;
                }
            },
            error:function(error){
                layer.msg("登陆失败");
            }
        })

    })

	// user register
	$('#userRegister').on('click', function () {
	    var registerUsername = $('#registerUsername').val().trim();
	    var registerPhoneOrEmail = $('#registerPhoneOrEmail').val().trim();
	    var registerPassword = $('#registerPassword').val().trim();
	    var confirmPassword = $('#confirmPassword').val().trim();
	    var phone;
	    var email;
	    var userInputCode = $(".verificationCode").val().trim();
	    // 验证用户名
        /*alert(registerUsername + "\n" + registerPhoneOrEmail + "\n" + registerPassword + "\n" + confirmPassword);*/
        if (registerUsername != null && registerUsername.length != ''){
            if(registerUsername.length > 20) {
                layer.msg("用户名长度只能在20个字符以内", function (){});
                return false;
            }
            /*else {
                if(!checkUserName.test(registerUsername)){
                    layer.msg("用户名只能由中文、英文、数字、“_”、“-”组成", function (){});
                    return false;
                }
            }*/
        } else {
            layer.msg("用户名不能为空", function (){});
            return false;
        }
        // 验证手机或邮箱
        if(registerPhoneOrEmail != null && registerPhoneOrEmail != ''){
            if(checkPhoneNumber.test(registerPhoneOrEmail)) {
                phone = registerPhoneOrEmail;
                if ((userInputCode+phone) != verificationCode){
                    layer.msg("验证码错误");
                    return false;
                }
            } else if (checkEmail.test(registerPhoneOrEmail)){
                email = registerPhoneOrEmail;
                if ((userInputCode+email) != verificationCode){
                    layer.msg("验证码错误");
                    return false;
                }
            } else {
                layer.msg("请填写正确的手机或邮箱", function (){});
                return false;
            }
        } else {
            layer.msg("手机号或邮箱不能为空", function (){});
            return false;
        }
        if(registerPassword != null && registerPassword != ''){
            if (registerPassword.length < 8 || registerPassword.length > 20){
                layer.msg("密码长度在8-20位之间", function (){});
                return false;
            } else {
                if (!checkPassword.test(registerPassword)){
                    layer.msg("密码需包含数字和字母", function (){});
                    return false;
                }
            }
        } else {
            layer.msg("密码不能为空", function (){});
            return false;
        }
        if (registerPassword != confirmPassword){
            layer.msg("两次密码不一致", function (){});
            return false;
        }
        var data = '{"nickname":"'+ registerUsername +
            '", "password":"'+ registerPassword;
        if (phone != null && phone != ''){
            data += '", "phoneNumber":"'+ phone + '"}';
        } else if(email != null && email != '') {
            data += '", "email":"'+ email + '"}';
        }
        /*var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});*/
        $.ajax({
            type : "POST",
            url : "/user/register",
            dataType:"json", //返回的数据类型
            /*contentType: "application/json; charset=utf-8",*/
            data:{"userStr": data
            },
            success:function(result){
                switch(result.code) {
                    case 1:
                        layer.msg("注册成功");
                        setTimeout(location.reload(), 500);
                        break;
                    case 2:
                        layer.msg("手机号已被注册", function (){});
                        break;
                    case 3:
                        layer.msg("邮箱已被注册", function (){});
                        break;
                    case 4:
                        layer.msg("用户名已经存在", function (){});
                        break;
                    default:
                        break;
                }
            },
            error:function(error){
                layer.msg("注册失败");
            }
        })
    })

    $("#modify-password").on("click", function () {
        var registerPhoneOrEmail = $('#registerPhoneOrEmail').val().trim();
        var registerPassword = $('#registerPassword').val().trim();
        var confirmPassword = $('#confirmPassword').val().trim();
        var phone;
        var email;
        var userInputCode = $(".verificationCode").val().trim();
        // 验证手机或邮箱
        if(registerPhoneOrEmail != null && registerPhoneOrEmail != ''){
            if(checkPhoneNumber.test(registerPhoneOrEmail)) {
                phone = registerPhoneOrEmail;
                if ((userInputCode+phone) != verificationCode){
                    layer.msg("验证码错误");
                    return false;
                }
            } else if (checkEmail.test(registerPhoneOrEmail)){
                email = registerPhoneOrEmail;
                if ((userInputCode+email) != verificationCode){
                    layer.msg("验证码错误");
                    return false;
                }
            } else {
                layer.msg("请填写正确的手机或邮箱", function (){});
                return false;
            }
        } else {
            layer.msg("手机号或邮箱不能为空", function () {});
            return false;
        }
        if(registerPassword != null && registerPassword != ''){
            if (registerPassword.length < 8 || registerPassword.length > 20){
                layer.msg("密码长度在8-20位之间", function (){});
                return false;
            } else {
                if (!checkPassword.test(registerPassword)){
                    layer.msg("密码需包含数字和字母", function (){});
                    return false;
                }
            }
        } else {
            layer.msg("密码不能为空", function (){});
            return false;
        }
        if (registerPassword != confirmPassword){
            layer.msg("两次密码不一致", function (){});
            return false;
        }
        var data = '{"password":"'+ registerPassword;
        if (phone != null && phone != ''){
            data += '", "phoneNumber":"'+ phone + '"}';
        } else if(email != null && email != '') {
            data += '", "email":"'+ email + '"}';
        }
        $.ajax({
            type : "POST",
            url : "/user/modifyPassword",
            dataType:"json", //返回的数据类型
            data:{
                "userStr": data
            },
            success:function(result){
                var code = parseInt(result.code);
                if (code == 1){
                    layer.msg("修改成功");
                    setTimeout(window.location.href="/" , 1200)
                } else {
                    layer.msg("修改失败");
                }
            },
            error:function(error){
                layer.msg("error");
            }
        })
    })

    $(".getCode").on("click", function(){
        var phoneNumber;
        var email;
        var registerPhoneOrEmail = $('#registerPhoneOrEmail').val().trim();
        // 验证手机或邮箱
        if(registerPhoneOrEmail != null && registerPhoneOrEmail != ''){
            if(checkPhoneNumber.test(registerPhoneOrEmail)) {
                phoneNumber = registerPhoneOrEmail;
                new invokeSetTime(".getCode");
                $.ajax({
                    type:"POST",
                    url:"/user/getPhoneVerificationCode",
                    dataType:"json",
                    data:{
                        "phoneNumber":phoneNumber
                    },
                    success:function (result) {
                        var code = parseInt(result.code);
                        if (code == 1){
                            verificationCode = result.verificationCode + phoneNumber;
                            new codeSetTimeOut();
                        } else {
                            $(".getCode").val("获取失败，点击重试");
                        }
                    },
                    error:function (error) {
                        $(".getCode").val("获取失败，点击重试");
                        alert("error")
                    }
                })
            } else if (checkEmail.test(registerPhoneOrEmail)){
                email = registerPhoneOrEmail;
                new invokeSetTime(".getCode");
                $.ajax({
                    type:"POST",
                    url:"/user/getEmailVerificationCode",
                    dataType:"json",
                    data:{
                        "email":email
                    },
                    success:function (result) {
                        var code = parseInt(result.code);
                        if (code == 1){
                            verificationCode = result.verificationCode + email;
                            new codeSetTimeOut();
                        } else {
                            $(".getCode").val("获取失败，点击重试");
                        }
                    },
                    error:function (error) {
                        $(".getCode").val("获取失败，点击重试");
                        alert("error")
                    }
                })
            } else {
                layer.msg("请填写正确的手机或邮箱", function (){});
                return false;
            }
        } else {
            layer.msg("手机号或邮箱不能为空", function (){});
            return false;
        }

    })

    function invokeSetTime(obj) {
        var countdown = 60;
        setTime(obj);

        function setTime(obj) {
            if (countdown == 0) {
                $(obj).attr("disabled", false);
                $(obj).val("获取验证码");
                countdown = 60;
                return;
            } else {
                $(obj).attr("disabled", true);
                $(obj).val("(" + countdown + ") s 重新发送");
                countdown--;
            }
            setTimeout(function () {
                    setTime(obj)
                }, 1000)
        }
    }

    //
    function codeSetTimeOut(obj){
        var countdown= 300;
        setTime();
        function setTime() {
            if (countdown == 0) {
                verificationCode = null;
                return;
            } else {
                countdown--;
            }
            setTimeout(function() {
                setTime() },1000)
        }
    }

})