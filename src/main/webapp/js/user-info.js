
$(function(){

	var phoneVerificationCode;
	var emailVerificationCode;
    var checkUserName = /^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$/; //用户名
    /*var checkPassword = /^.*[A-Za-z0-9\\w_-]+.*$/; //密码*/
    var checkPassword = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    var checkPhoneNumber = /^0?(13|15|18|17)[0-9]{9}$/; //手机号
    var checkEmail =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件
	var oldNickname = $("#nickname").val();
	var newNickname;
	var oldJob = $("#job").val();
	var newJob;
	var oldCompany = $("#company").val();
	var newCompany;
	var oldIntroduction = $("#introduction").val();
	var newIntroduction;
	var oldHomepage = $("#homepage").val();
	var newHomepage;
	var oldPhoneNumber = $("#phoneNumber").val();
	var newPhoneNumber;
	var oldEmail = $("#email").val();
	var newEmail;
	var oldGithub = $("#github").val();
	var newGithub;
	//var olPassword = $("#password").val().trim();
	var newPassword;
	
	$(".edit-info-title a").on("click", function() {
        $(this).addClass("edit-topic").siblings().removeClass("edit-topic");
        var id = $(this).attr("id");
        if("profile" == id){
        	$(".profile").show();
        	$(".account").hide();
        } else {
        	$(".profile").hide();
        	$(".account").show();
        }
  	})
	
	$(".edit-one-div").on("click", function(){
		$(this).hide();
		$(this).next().show();
	})

	// 修改手机号
    $(".edit-phone").on("click", function(){
        $(this).hide();
        $(this).next().show();
        $(".phone-code-container").show();
    })

	// 修改邮箱
    $(".edit-email").on("click", function(){
        $(this).hide();
        $(this).next().show();
        $(".email-code-container").show();
    })

    // 修改密码
    $(".edit-password").on("click", function(){
        $(this).hide();
        $(this).next().show();
        $(".password-container").show();
    })
	
	$(".save").mousedown(function(){
		var id = $(this).parent().prev().prev().attr("id");
		var saveAndCancel = $(this).parent();
		var edit = $(this).parent().prev();
		setDataById(saveAndCancel, edit, id);
	})
	
	$(".cancel").on("click", function(){
		var id = $(this).parent().prev().prev().attr("id");
		cancelDataById(id);
		$(this).parent().hide();
		$(this).parent().prev().show();
	})

    $(".phone-cancel").on("click", function(){
        var id = $(this).parent().prev().prev().attr("id");
        cancelDataById(id);
        $(this).parent().hide();
        $(this).parent().prev().show();
        $(".phone-code-container").hide();
    })

    $(".email-cancel").on("click", function(){
        var id = $(this).parent().prev().prev().attr("id");
        cancelDataById(id);
        $(this).parent().hide();
        $(this).parent().prev().show();
        $(".email-code-container").hide();
    })

    $(".password-cancel").on("click", function(){
        $(this).parent().hide();
        $(this).parent().prev().show();
        $(".password-container").hide();
        $("#oldPassword").val("");
        $(".password-container input").val("");
    })
	
	$("#nickname").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		newNickname = $("#nickname").val().trim();
		var object = $("#nickname");
		if(newNickname == oldNickname){
			object.next().show();
			object.next().next().hide();
		}
	})
	
	$("#job").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		var object = $("#job");
		newJob = object.val();
		if(newJob == oldJob){
			object.next().show();
			object.next().next().hide();
		}
		$("#job").slideDown(300);
	})
	
	$("#company").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		var object = $("#company");
		newCompany = object.val();
		if(newCompany == oldCompany){
			object.next().show();
			object.next().next().hide();
		}
	});
	$("#introduction").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		var object = $("#introduction");
		newIntroduction = object.val();
		if(newIntroduction == oldIntroduction){
			object.next().show();
			object.next().next().hide();
		}
	})
	$("#homepage").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		var object = $("#homepage");
		newHomepage = object.val();
		if(newHomepage == oldHomepage){
			object.next().show();
			object.next().next().hide();
		}
	})
	
	$("#phoneNumber").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
        $(".phone-code-container").show();
	}).blur(function(){
		var object = $("#phoneNumber");
		newPhoneNumber = object.val();
		if(newPhoneNumber == oldPhoneNumber){
			object.next().show();
			object.next().next().hide();
            $(".phone-code-container").hide();
		}
	})
	
	$("#email").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
        $(".email-code-container").show();
	}).blur(function(){
		var object = $("#email");
		newEmail = object.val();
		if(newEmail == oldEmail){
			object.next().show();
			object.next().next().hide();
            $(".email-code-container").hide();
		}
	})
	
	$("#github").on("focus", function(){
		$(this).next().hide();
		$(this).next().next().show()
	}).blur(function(){
		var object = $("#github");
		newGithub = object.val();
		if(newGithub == oldGithub){
			object.next().show();
			object.next().next().hide();
		}
	})

    $("#oldPassword").on("focus", function(){
        $(this).next().hide();
        $(this).next().next().show()
		$(".password-container").show();
    })

/**
 * 保存按钮
 * 需要传给数据库
 * AJAX
 * @param {Object} id
 */
function setDataById(saveAndCancel, edit, id){
	switch(id){
		case "nickname":
			var nickname = $("#" + id).val().trim();
			if(nickname != null && nickname != ""){
				$.ajax({
					type:"POST",
					url:"/user/modifyUserInfo",
					dataType:"json",
					data:{
						"data":nickname,
						"type":"nickname"
					},
					success:function (result) {
						if (result.code == 1){
                            saveAndCancel.hide();
                            edit.show();
                            oldNickname = nickname;
						} else if ((result.code == 2)){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("此用户名已经存在");
						}
                    },
					error:function (error) {
						layer.msg("未知错误");
                    }
				})
			} else {
                layer.msg("用户名不能为空", function () {});
                $("#" + id).val(oldNickname);
			}
			break;
		case "job":
            var job = $("#"+id).val().trim();
            $.ajax({
                type:"POST",
                url:"/user/modifyUserInfo",
                dataType:"json",
                data:{
                    "data":job,
                    "type":"job"
                },
                success:function (result) {
                    if (result.code == 1){
                        saveAndCancel.hide();
                        edit.show();
                        oldJob = job;
                    } else if ((result.code == 2)){
                        layer.msg("请先登录");
                    } else {
                        layer.msg("修改失败");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
			break;
		case "company":
		    var company =  $("#"+id).val().trim();
            $.ajax({
                type:"POST",
                url:"/user/modifyUserInfo",
                dataType:"json",
                data:{
                    "data":company,
                    "type":"company"
                },
                success:function (result) {
                    if (result.code == 1){
                        saveAndCancel.hide();
                        edit.show();
                        oldCompany = company;
                    } else if ((result.code == 2)){
                        layer.msg("请先登录");
                    } else {
                        layer.msg("修改失败");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
			break;
		case "introduction":
            var introduction =  $("#"+id).val().trim();
            $.ajax({
                type:"POST",
                url:"/user/modifyUserInfo",
                dataType:"json",
                data:{
                    "data":introduction,
                    "type":"introduction"
                },
                success:function (result) {
                    if (result.code == 1){
                        saveAndCancel.hide();
                        edit.show();
                        oldIntroduction = introduction;
                    } else if ((result.code == 2)){
                        layer.msg("请先登录");
                    } else {
                        layer.msg("修改失败");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
			break;
		case "homepage":
            var homepage =  $("#"+id).val().trim();
            $.ajax({
                type:"POST",
                url:"/user/modifyUserInfo",
                dataType:"json",
                data:{
                    "data":homepage,
                    "type":"homepage"
                },
                success:function (result) {
                    if (result.code == 1){
                        saveAndCancel.hide();
                        edit.show();
                        oldHomepage = homepage;
                    } else if ((result.code == 2)){
                        layer.msg("请先登录");
                    } else {
                        layer.msg("修改失败");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
			break;
		case "phoneNumber":
            var phoneNumber = $("#"+id).val().trim();
			if(oldPhoneNumber == phoneNumber){
                $(".phone-code-container").hide();
                saveAndCancel.hide();
                edit.show();
				return;
			}
			var phoneInputVerificationCode = $(".phone-verification").val().trim() + phoneNumber;
			if (phoneInputVerificationCode == phoneVerificationCode){
				// TODO:ajax request 写入数据库
                $.ajax({
                    type:"POST",
                    url:"/user/modifyUserInfo",
                    dataType:"json",
                    data:{
                        "data":phoneNumber,
                        "type":"phoneNumber"
                    },
                    success:function (result) {
                        if (result.code == 1){
                            $(".phone-code-container").hide();
                            saveAndCancel.hide();
                            edit.show();
                            oldPhoneNumber = phoneNumber;
                            layer.msg("更换手机号成功");
                            phoneVerificationCode = "";
                        } else if ((result.code == 2)){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("修改失败");
                        }
                    },
                    error:function (error) {
                        layer.msg("未知错误");
                    }
                })
			} else {
				layer.msg("验证码错误");
			}
			break;
		case "email":
            var email = $("#"+id).val().trim();
            if(oldEmail == email){
                $(".email-code-container").hide();
                saveAndCancel.hide();
                edit.show();
                return;
            }
            var emailInputVerificationCode = $(".email-verification").val().trim() + email;
            console.log(emailInputVerificationCode)
            console.log(emailVerificationCode)
            if (emailInputVerificationCode == emailVerificationCode){
                // TODO:ajax request 写入数据库
                $.ajax({
                    type:"POST",
                    url:"/user/modifyUserInfo",
                    dataType:"json",
                    data:{
                        "data":email,
                        "type":"email"
                    },
                    success:function (result) {
                        if (result.code == 1){
                            $(".email-code-container").hide();
                            saveAndCancel.hide();
                            edit.show();
                            oldEmail = email;
                            layer.msg("更换邮箱成功");
                            emailVerificationCode = "";
                        } else if ((result.code == 2)){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("修改失败");
                        }
                    },
                    error:function (error) {
                        layer.msg("未知错误");
                    }
                })
            } else {
                layer.msg("验证码错误");
            }
			break;
		case "github":
            var github =  $("#"+id).val().trim();
            $.ajax({
                type:"POST",
                url:"/user/modifyUserInfo",
                dataType:"json",
                data:{
                    "data":github,
                    "type":"github"
                },
                success:function (result) {
                    if (result.code == 1){
                        saveAndCancel.hide();
                        edit.show();
                        oldGithub = github;
                    } else if ((result.code == 2)){
                        layer.msg("请先登录");
                    } else {
                        layer.msg("修改失败");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
			break;
		case "oldPassword":
            var oldPassword =  $("#"+id).val().trim();
            var newPassword = $("#newPassword").val().trim();
            var confirmNewPassword = $("#confirmNewPassword").val().trim();
            if(oldPassword != null && oldPassword != "" && newPassword != null && newPassword != "") {
            	if (newPassword != confirmNewPassword){
            		layer.msg("两次新密码不一致");
            		return false;
				}
				if (!checkPassword.test(newPassword)) {
            		layer.msg("密码请包含字母和数字");
            		return false;
				}
                $.ajax({
                    type:"POST",
                    url:"/user/modifyUserInfo",
                    dataType:"json",
                    data:{
                        "data":oldPassword+","+newPassword,
                        "type":"password"
                    },
                    success:function (result) {
                        if (result.code == 1){
                            saveAndCancel.hide();
                            edit.show();
                            $(".password-container").hide();
                            $("#"+id).val("");
                            $(".password-container input").val("");
                            layer.msg("修改密码成功");
                        } else if ((result.code == 2)){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("修改失败");
                        }
                    },
                    error:function (error) {
                        layer.msg("未知错误");
                    }
                })
			} else {
                layer.msg("密码不能为空");
                return false;
			}
	}
}

    $(".getPhoneCode").on("click", function(){
        var phoneNumber = $('#phoneNumber').val().trim();
        // 验证手机或邮箱
        if(phoneNumber != null && phoneNumber != ''){
        	if(oldPhoneNumber != phoneNumber){
                if(checkPhoneNumber.test(phoneNumber)) {
                    new invokeSetTime(".getPhoneCode");
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
                                phoneVerificationCode = result.verificationCode + phoneNumber;
                                new phoneCodeSetTimeOut();
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
                    layer.msg("请填写正确的手机号");
                    return false;
                }
			} else {
        		layer.msg("手机号没有变化")
			}

        } else {
            layer.msg("手机号不能为空", function (){});
            return false;
        }
    })

    $(".getEmailCode").on("click", function(){
        var email = $('#email').val().trim();
        if (oldEmail != email){
            if(email != null && email != '') {
                if (checkEmail.test(email)) {
                    new invokeSetTime(".getEmailCode");
                    $.ajax({
                        type: "POST",
                        url: "/user/getEmailVerificationCode",
                        dataType: "json",
                        data: {
                            "email": email
                        },
                        success: function (result) {
                            var code = parseInt(result.code);
                            if (code == 1) {
                                emailVerificationCode = result.verificationCode + email;
                                new emailCodeSetTimeOut();
                            } else {
                                $(".getEmailCode").val("获取失败，点击重试");
                            }
                        },
                        error: function (error) {
                            $(".getEmailCode").val("获取失败，点击重试");
                            alert("error")
                        }
                    })
                } else {
                    layer.msg("请填写正确的邮箱");
                    return false;
                }
            } else {
                layer.msg("邮箱不能为空", function (){});
                return false;
			}
		} else {
            layer.msg("邮箱没有变化")
        }
        // 验证手机或邮箱

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

    // 手机验证码失效
    function phoneCodeSetTimeOut(){
        var countdown= 300;
        setTime();
        function setTime() {
            if (countdown == 0) {
                phoneVerificationCode = null;
                return;
            } else {
                countdown--;
            }
            setTimeout(function() {
                setTime() },1000)
        }
    }

    function emailCodeSetTimeOut(){
        var countdown= 300;
        setTime();
        function setTime() {
            if (countdown == 0) {
                emailVerificationCode = null;
                return;
            } else {
                countdown--;
            }
            setTimeout(function() {
                setTime() },1000)
        }
    }

/**
 * 取消按钮
 * 使值恢复
 */
function cancelDataById(id){
	switch(id){
		case "nickname":
			$("#"+id).val(oldNickname);
			break;
		case "job":
			$("#"+id).val(oldJob);
			break;
		case "company":
			$("#"+id).val(oldJob);
			break;
		case "introduction":
			$("#"+id).val(oldIntroduction);
			break;
		case "homepage":
			$("#"+id).val(oldHomepage);
			break;
		case "phoneNumber":
			$("#"+id).val(oldPhoneNumber);
			break;
		case "email":
			$("#"+id).val(oldEmail);
			break;
		case "github":
			$("#"+id).val(oldGithub);
			break;
	}
}

    $("#changeHeadPic").on("change", function () {
    	var fileName = $("#changeHeadPic").val().trim();
        if( fileName!= "") {
        	var point = fileName.lastIndexOf(".");
        	var type = fileName.substr(point).toLocaleLowerCase();
            if(type==".jpg"||type==".png"){
            	var file = $('#changeHeadPic')[0].files[0];
            	var fileSize = file.size;
            	if (fileSize > 10485760){
            		layer.msg("图片不得超过10M");
					return;
				}
                var formData = new FormData();
                formData.append('imageData', file);
                $.ajax({
                    type: "POST",
                    url:"/user/changeHeadPicture",
                    cache: false,
                    data:formData,
                    processData: false,
                    contentType: false,
                    success: function(result){
                        var code = result.code;
                        if(code == 1) {
                            var headPic = result.headPic;
                            $("#headPic").attr("src","/image/head-pic/"+headPic);
                        } else {
                            layer.msg("上传失败");
                        }
                    },
                    error: function () {
                        alert("上传失败");
                    },
                });
            } else {
            	layer.msg("只支持JPG和PNG格式图片")
			}
        } else {
            lay.msg("请先选择文件");
        }
    })
})





