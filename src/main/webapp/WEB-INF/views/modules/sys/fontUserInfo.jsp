<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>个人信息</title>
	<meta name="decorator" content="default"/>
	<style type="text/css">
	.info{
	
	height: 480px;
	width: 200px;
	}
	
	</style>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#inputForm").validate({
				submitHandler: function(form){
					loading('正在提交，请稍等...');
					form.submit();
				},
				errorContainer: "#messageBox",
				errorPlacement: function(error, element) {
					$("#messageBox").text("输入有误，请先更正。");
					if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
						error.appendTo(element.parent().parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
		});
	</script>
</head>
<body>
<div class="info">
	<form:form id="inputForm" modelAttribute="fontUser" action="${ctx}/sys/font/info" method="post" class="form-horizontal">	

		<div class="control-group">
			<label class="control-label">用户昵称</label>
			<div class="controls">
				<label class="lbl">${fontUser.nickname}</label>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">电话号码</label>
			<div class="controls">
				<label class="lbl">${fontUser.phoneNumber}</label>
			</div>
		</div>
		<%-- <div class="control-group">
			<label class="control-label">电子邮件</label>
			<div class="controls">
				<form:input path="name" htmlEscape="false" maxlength="50" class="required" readonly="true"/>
			</div>
		</div>--%>
	
		<div class="form-actions">
			<input id="btnSubmit" class="btn btn-primary" type="submit" value="保 存"/>
		</div> 
	</form:form>
	</div>
</body>
</html>