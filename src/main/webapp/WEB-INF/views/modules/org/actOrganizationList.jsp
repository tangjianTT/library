<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>活动管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			
		});
		function page(n,s){
			$("#pageNo").val(n);
			$("#pageSize").val(s);
			$("#searchForm").submit();
        	return false;
        }
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a href="${ctx}/org/actOrganization/">活动列表</a></li>
		<shiro:hasPermission name="org:actOrganization:edit"><li><a href="${ctx}/org/actOrganization/form">活动添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="actOrganization" action="${ctx}/org/actOrganization/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>活动标题：</label>
				<form:input path="title" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>发布组织：</label>
				<sys:treeselect id="office" name="office.id" value="${actOrganization.office.id}" labelName="office.name" labelValue="${actOrganization.office.name}"
					title="部门" url="/sys/office/treeData?type=2" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>开始日期：</label>
				<input name="beginStartDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${actOrganization.beginStartDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/> - 
				<input name="endStartDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${actOrganization.endStartDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>活动标题</th>
				<th>发布组织</th>
				<th>活动描述</th>
				<th>活动地点</th>
				<th>开始日期</th>
				<th>结束日期</th>
				<th>状态</th>
				<th>参与人数</th>
				<shiro:hasPermission name="org:actOrganization:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="actOrganization">
			<tr>
				<td><a href="${ctx}/org/actOrganization/form?id=${actOrganization.id}">
					${actOrganization.title}
				</a></td>
				<td>
					${actOrganization.office.name}
				</td>
				<td>
					${actOrganization.actDescribe}
				</td>
				<td>
					${actOrganization.place}
				</td>
				<td>
					<fmt:formatDate value="${actOrganization.startDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<td>
					<fmt:formatDate value="${actOrganization.endDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<td>
				
			 	 <c:set var="nowDate" value="<%=System.currentTimeMillis()%>"></c:set>  		       
				 <c:if test="${nowDate - actOrganization.startDate.time > 0 && nowDate - actOrganization.endDate.time < 0}">进行中</c:if>
 				 <c:if test="${nowDate - actOrganization.endDate.time >0 }">已结束</c:if>
 				 <c:if test="${nowDate - actOrganization.startDate.time <0 && nowDate - actOrganization.endDate.time <0 }">即将开启</c:if>
 			<%-- 	<c:remove var="nowDate"/>
 				<c:remove var="actOrganization.startDate"/>
 				<c:remove var="actOrganization.endDate"/> --%>
 				</td>
				<td>
					${actOrganization.count}
				</td>
				<shiro:hasPermission name="org:actOrganization:edit"><td>
    				<a href="${ctx}/org/actOrganization/form?id=${actOrganization.id}">修改</a>
					<a href="${ctx}/org/actOrganization/delete?id=${actOrganization.id}" onclick="return confirmx('确认要删除该活动吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>