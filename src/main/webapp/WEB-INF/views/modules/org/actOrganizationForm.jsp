<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>活动管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			//$("#name").focus();
			$("#inputForm").validate({
				submitHandler: function(form){
					var startDate = document.getElementById("startDate").value;
					var endDate = document.getElementById("endDate").value;
					 var d1 = new Date(startDate.replace(/\-/g, "\/")); 
					 var d2 = new Date(endDate.replace(/\-/g, "\/")); 
					 var d = new Date();
					 if(d1<d || d2<d){
						 alert("开始日期或结束日期必须大于当前日期！");
					    return true; 
					 }
					 
					if(startDate!=""&&endDate!=""&&d1 >=d2) 
					{
						alert("开始日期必须小于结束日期！");
					    return true; 
					}
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
	<ul class="nav nav-tabs">
		<li><a href="${ctx}/org/actOrganization/">活动列表</a></li>
		<li class="active"><a href="${ctx}/org/actOrganization/form?id=${actOrganization.id}">活动<shiro:hasPermission name="org:actOrganization:edit">${not empty actOrganization.id?'修改':'添加'}</shiro:hasPermission><shiro:lacksPermission name="org:actOrganization:edit">查看</shiro:lacksPermission></a></li>
	</ul><br/>
	<form:form id="inputForm" modelAttribute="actOrganization" action="${ctx}/org/actOrganization/save" method="post" class="form-horizontal">
		<form:hidden path="id"/>
		<sys:message content="${message}"/>		
		<div class="control-group">
			<label class="control-label">活动标题：</label>
			<div class="controls">
				<form:input path="title" htmlEscape="false" maxlength="64" class="input-xlarge required"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">发布院校：</label>
			<div class="controls">
				<sys:treeselect id="office" name="office.id" value="${actOrganization.office.id}" labelName="office.name" labelValue="${actOrganization.office.name}"
					title="院校" url="/sys/office/treeData?type=2" cssClass="required" allowClear="true" notAllowSelectParent="true"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动描述：</label>
			<div class="controls">
				<form:textarea path="actDescribe" htmlEscape="false" rows="4" maxlength="64" class="input-xxlarge required"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动地点：</label>
			<div class="controls">
				<form:input path="place" htmlEscape="false" maxlength="64" class="input-xlarge required"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">开始日期：</label>
			<div class="controls">
				<input id="startDate" name="startDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate required"
					value="<fmt:formatDate value="${actOrganization.startDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">结束日期：</label>
			<div class="controls">
				<input id="endDate" name="endDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate required"
					value="<fmt:formatDate value="${actOrganization.endDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
	
		<div class="form-actions">
			<shiro:hasPermission name="org:actOrganization:edit"><input id="btnSubmit" class="btn btn-primary" type="submit" value="保 存"/>&nbsp;</shiro:hasPermission>
			<input id="btnCancel" class="btn" type="button" value="返 回" onclick="history.go(-1)"/>
		</div>
	</form:form>
</body>
</html>