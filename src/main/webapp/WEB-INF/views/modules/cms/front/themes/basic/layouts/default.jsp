<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<!DOCTYPE html>
<html>
<head>
	<title><sitemesh:title default="欢迎光临"/> -LIBRARY - Powered By ZL</title>
	<%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
	<!-- Baidu tongji analytics --><script>var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="//hm.baidu.com/hm.js?82116c626a8d504a5c0675073362ef6f";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script>
	<sitemesh:head/>
	<!-- <link rel="stylesheet" href="/css/login-register.css"> -->
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
  <link type="text/css" href="${path}/css/login-register.css" rel="stylesheet"> 
 <script src="http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js"></script>
<script type="text/javascript" src="${path}/static/layer/layer.js"></script>

<style type="text/css">
a:hover,a:active{color:#ffffff;text-decoration:underline;}
</style>

</head>
<body>

	<div class="navbar navbar-fixed-top" style="position:static;margin-bottom:10px;">
      <div class="navbar-inner">
        <div class="container">
          <c:choose>
   			<c:when test="${not empty site.logo}">
   				<img alt="${site.title}" src="${site.logo}" class="container" onclick="location='${ctx}/index-${site.id}${fns:getUrlSuffix()}'">
   			</c:when>
   			<c:otherwise><a class="brand" href="${ctx}/index-${site.id}${fns:getUrlSuffix()}">图书馆借阅系统平台</a></c:otherwise>
   		  </c:choose>
          <div class="nav-collapse">
            <ul id="main_nav" class="nav nav-pills">
             	<li class="${not empty isIndex && isIndex ? 'active' : ''}"><a href="${ctx}/index-1${fns:getUrlSuffix()}"><span>${site.id eq '1'?'首　 页':'返回主站'}</span></a></li>
				<c:forEach items="${fnc:getMainNavList(site.id)}" var="category" varStatus="status"><c:if test="${status.index lt 6}">
                    <c:set var="menuCategoryId" value=",${category.id},"/>
		    		<li class="${requestScope.category.id eq category.id||fn:indexOf(requestScope.category.parentIds,menuCategoryId) ge 1?'active':''}">
		    	  
		    	   <c:if test="${category.id eq '200'}"	>
		    	   <a href="${ctx}/list-${category.id}.html?userId=${sessionScope.user.id}" target="${category.target}"><span>${category.name}</span>
		    		</a>
		    	   </c:if>
		    	    <c:if test="${category.id ne '200'}">
		    		<a href="${category.url}" target="${category.target}"><span>${category.name}</span>
		    		</a>
		    		</c:if>
		    		</li>
		    	</c:if></c:forEach>
		    
			    <li id="siteSwitch" class="dropdown">
			       	<a class="dropdown-toggle" data-toggle="dropdown" href="#" title="站点"><i class="icon-retweet"></i></a>
					<ul class="dropdown-menu">
					  <c:forEach items="${fnc:getSiteList()}" var="site"><li><a href="#" onclick="location='${ctx}/index-${site.id}${urlSuffix}'">${site.title}</a></li></c:forEach>
					</ul>
				</li>
		    	<li id="themeSwitch" class="dropdown">
			       	<a class="dropdown-toggle" data-toggle="dropdown" href="#" title="主题切换"><i class="icon-th-large"></i></a>
				    <ul class="dropdown-menu">
				      <c:forEach items="${fns:getDictList('theme')}" var="dict"><li><a href="#" onclick="location='${pageContext.request.contextPath}/theme/${dict.value}?url='+location.href">${dict.label}</a></li></c:forEach>
				    </ul>
				    <!--[if lte IE 6]><script type="text/javascript">$('#themeSwitch').hide();</script><![endif]-->
            </ul>
          <ul id="userControl" class="nav pull-right">
           <c:if test="${not empty sessionScope.user.id}">		
					<li id="userInfo" class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#" title="个人信息">您好, ${sessionScope.user.name}&nbsp;<span id="notifyNum" class="label label-info hide"></span></a>
						 <ul class="dropdown-menu">
							<li><a id="exit" ><i class="icon-user"></i>&nbsp; 退出</a></li>
						</ul>
					</li>
		 </c:if>	
		  <c:if test="${empty sessionScope.user.id}">
		   <li id="userInfo" class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown"  id="login" title="用户登录">用户登录&nbsp;<span id="notifyNum" class="label label-info hide"></span></a>
					</li>
					<!-- <li><a  id="register"  title="注册">注册</a> </li> -->
					<li>&nbsp;</li>
		 </c:if>
				</ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
    
 <div style="background-image: url(images/index.jpg) ;background-attachment: fixed; background-size: 100%;
                  background-repeat:no-repeat; margin-top: -10px" >
   <marquee scrollAmount=7 direction="left" scrolldelay="60" style="top: 175px;position:  absolute;">
			<a id="move_id" style="font-size: 20px;color: yellow;" href="/f/list-300.html?userId=${sessionScope.user.id}"></a>
		</marquee>
		<script type="text/javascript">
		window.setInterval("org()",5000);
		  function org(){ 
		  $.ajax({
		        type:"GET",
		        url:"/f/newOrg",
				dataType:"json",
				data:{
				},
				success:function (result) {
					 $('#move_id').html("");
					var org = result.newOrg;
					var tmp = 0;
					console.log(org.title);
						var index = tmp%4;
						document.getElementById("move_id").innerHTML = "最新活动发布："+org.title+",发布时间："+org.startDate+",终止时间："+org.endDate+",活动地点："+org.place+"。快来参加吧！";
						tmp++;	
		        },
				error:function (error) {
					alert("error")
		        }
		    })
		 } 
			
			
		</script>
	<div class="container">
		<div class="content" style="color: rgb;background-color: rgba(255, 255, 255, 0.4); padding-bottom:35px;margin:150px 0 10px; width: 1000px;">
			<sitemesh:body/>
		</div>
		<hr style="margin:20px 0 10px;">
		<footer>
			<div class="footer_nav"><a href="${ctx}/guestbook" target="_blank">公共留言</a> <%-- | <a href="${ctx}/search" target="_blank">全站搜索</a> --%> | <%-- <a href="${ctx}/map-${site.id}${fns:getUrlSuffix()}" target="_blank">站点地图</a> | --%> <a href="mailto:thinkgem@163.com">技术支持</a> | <a href="${pageContext.request.contextPath}${fns:getAdminPath()}" target="_blank">后台管理</a></div>
			<div class="pull-right">${fns:getDate('yyyy年MM月dd日 E')}</div><div class="copyright">		Copyright &copy; 2018-${fns:getConfig('copyrightYear')} <a href="${pageContext.request.contextPath}${fns:getFrontPath()}">${fns:getConfig('productName')}</a> - Powered By ZL ${fns:getConfig('version')}
</div>
      	</footer>
    </div> <!-- /container -->
  
    </div>
   
   
     
    <!-- login -->
	<div class="theme-popover login" style="height: 322px">
	    <div class="theme-poptit">
	          <a href="javascript:void(0)" title="关闭" class="close">×</a>
	          	                             图书借阅系统登录
        </div>
        <div class="">
            <div class="input_div">
                <input class="input-group" id="nameOrEmail" type="text" name="loginPhoneOrEmail" size="20" maxlength="64" placeholder="请填写用户名或邮箱" style="
                border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px;" />
            </div>
            <div class="input_div">
                <input class="input-group" type="password" id="password" name="password" size="20"  maxlength="64" placeholder="请输入密码" style="
                 border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px;"/>
            </div>
            <div class="input_div">
                <input type="button" class="loginBtn" id="userLogin"  value="登 录 " style="width: 290px" />
            </div>
            <!-- <div class="input_div other-option">
                <span>没有账号？ <a href="javascript:void(0)" id="to-register" style="color: #007FFF;">注册</a></span>
                <span><a href="/user/forgetPassword" target="_blank">忘记密码</a></span>
            </div> -->
            <div class="sentence">学到老、活到老</div>
        </div>
	</div>
	<div class="theme-popover-mask"></div>
	
	<!-- regist 
	 <div class="theme-popover register" >
		 <div class="theme-poptit">
	          <a href="javascript:void(0)" title="关闭" class="close">×</a>
	          <h3 style="color: black">注册</h3>
		 </div>
		 <div>
			<div class="input_div" >
				<input class="input-group" type="text" id="registerUsername" name="registerUsername" size="20" maxlength="64" placeholder="请输入用户名" style="
				border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px"/>
			</div>
			<div class="input_div">
				<input class="input-group" type="text" id="registerPhoneOrEmail" name="registerPhoneOrEmail" size="20" maxlength="64" placeholder="请填写手机号或邮箱" style="
				 border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px"/>
			</div>
             <div class="input_div verificationCode-container">
                 <input class="input-group verificationCode" type="text" name="verificationCode" maxlength="6" placeholder="验证码" style="
                  border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px"/>
                 <input type="button" class="getCode" value="获取验证码" style="height: 30px"/>
             </div>
			<div class="input_div">
				<input class="input-group" type="password" id="registerPassword" name="registerPassword" size="20"  maxlength="64" placeholder="请输入密码" style="
				 border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px"/>
			</div>
			<div class="input_div">
				<input class="input-group" type="password" id="confirmPassword" name="confirmPassword" size="20"  maxlength="64" placeholder="请确认密码" style=" border: 1px solid #e9e9e9;
	            border-radius: 2px;
	            height: 20px;
	            width: 280px;
	            font-size:16px;
	            padding-left: 10px"/>
			</div>
			<div class="input_div">
				<input class="btn" type="button" id="userRegister" value=" 注 册 " />
			</div>
			<div  class="input_div">已有账号 <a href="#" id="to-login" style="color: #007FFF;">登录</a></div>
	     </div>
	</div> -->
	
	
	
	<script type="text/javascript">
	jQuery(document).ready(function($) {
	    var verificationCode;
	    /*var checkUserName = /^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$/; //用户名*/
	    /*var checkPassword = /^.*[A-Za-z0-9\\w_-]+.*$/; //密码*/
/* 	    var checkPassword = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
 */	    var checkEmail =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件

		$('#login').on("click", function(){
			$('.theme-popover-mask').fadeIn(100);
			$('.login').slideDown(200);
		})
		
		$('xx').on("click",function(){
			
			alert("xx");
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
	        var nameOrEmail = $('#nameOrEmail').val().trim();
	        var password = $('#password').val().trim();
	        var phone;
	        var email;
	        var isPhone; // 1:是用户名，0:邮箱
	        if (nameOrEmail == null || nameOrEmail == ''){
	        // 验证手机或邮箱
	            layer.msg("用户名或邮箱不能为空", function (){});
	            return false;
	        }
	        if(password == null || password == ''){
	            layer.msg("密码不能为空", function (){});
	            return false;
	        }
	        $.ajax({
	            type : "POST",
	            url : "${ctx}/sys/font/login",
	            dataType:"json", //返回的数据类型
	            /*contentType: "application/json; charset=utf-8",*/
	            data:{
	                    "nameOrEmail" : nameOrEmail,
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
	                    /*case 3:
	                        layer.msg("邮箱已不存在");
	                        break;*/
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
	            url : "${ctx}/sys/font/register",
	            dataType:"json", //返回的数据类型
	            /*contentType: "application/json; charset=utf-8",*/
	            data:{"userStr": data},
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
	                    url:"${ctx}/sys/font/getPhoneVerificationCode",
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
	                    url:"${ctx}/sys/font/getEmailVerificationCode",
	                    dataType:"json",
	                    data:{
	                        "email":email
	                    },
	                    success:function (result) {
	                        var code = parseInt(result.code);
	                        if (code == 1){
	                            verificationCode = result.verificationCode + email;
	                            new codeSetTimeOut();
	                        } else{
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
	
	$("#exit").on("click",function(){ 
		  $.ajax({
	            type : "POST",
	            url : "${ctx}/sys/font/loginOut",
	            dataType:"json", //返回的数据类型
	            /*contentType: "application/json; charset=utf-8",*/
	            data:{
	            },
	            success:function(result){
	                switch(result.code) {
	                    case 0:
	                        layer.msg("退出成功");
	                        location.reload();
	                        break;
	                    case 1:
	                        layer.msg("退出失败");
	                        break;
	                }
	            },
	            error:function(error){
	                layer.msg("退出失败1");
	            }
	        })
	})
	</script>
	
	
</body>
</html>