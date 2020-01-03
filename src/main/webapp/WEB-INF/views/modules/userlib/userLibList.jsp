<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>图书管理</title>
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
		<li class="active"><a href="${ctx}/userlib/sysUserLib/">图书列表</a></li>
	</ul>
	<form:form id="searchForm" modelAttribute="sysUserLib" action="${ctx}/userlib/sysUserLib/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>所属院校：</label>
				<sys:treeselect id="office" name="office.id" value="${sysUserLib.office.id}" labelName="office.name" labelValue="${sysUserLib.office.name}"
					title="部门" url="/sys/office/treeData?type=2" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>借阅人：</label>
				<sys:treeselect id="user" name="user.id" value="${sysUserLib.user.id}" labelName="user.name" labelValue="${sysUserLib.user.name}"
					title="用户" url="/sys/office/treeData?type=3" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>图书编号：</label>
				<form:input path="bookId" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>图书名称：</label>
				<form:input path="bookName" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>是否归还：</label>
				<form:select path="flag" class="input-medium">
					<form:option value="" label=""/>
					<form:options items="${fns:getDictList('back_flag')}" itemLabel="label" itemValue="value" htmlEscape="false"/>
				</form:select>
			</li>
			<li><label>借阅日期：</label>
				<input name="borrowTime" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${sysUserLib.borrowTime}" pattern="yyyy-MM-dd HH:mm:ss"/>"
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
				<th>所属院校</th>
				<th>借阅人</th>
				<th>图书编号</th>
				<th>图书名称</th>
				<th>是否归还</th>
				<th>借阅日期</th>
				<th>归还日期</th>
<%--
				<shiro:hasPermission name="userlib:sysUserLib:edit"><th>操作</th></shiro:hasPermission>
--%>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="sysUserLib">
			<tr>
				<td><a href="${ctx}/userlib/sysUserLib/form?id=${sysUserLib.id}">
					${sysUserLib.office.name}
				</a></td>
				<td>
					${sysUserLib.user.name}
				</td>
				<td>
					${sysUserLib.bookId}
				</td>
				<td>
					${sysUserLib.bookName}
				</td>
				<td>
					${fns:getDictLabel(sysUserLib.flag, 'back_flag', '')}
				</td>
				<td>
					<fmt:formatDate value="${sysUserLib.borrowTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<td>
					<fmt:formatDate value="${sysUserLib.returnTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<%--<shiro:hasPermission name="userlib:sysUserLib:edit"><td>
    				<a href="${ctx}/userlib/sysUserLib/form?id=${sysUserLib.id}">修改</a>
					<a href="${ctx}/userlib/sysUserLib/back?id=${sysUserLib.id}" onclick="return confirmx('确认要归还该图书吗？', this.href)">归还</a>
					<a href="${ctx}/userlib/sysUserLib/delete?id=${sysUserLib.id}" onclick="return confirmx('确认要删除该图书吗？', this.href)">删除</a>
				</td></shiro:hasPermission>--%>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>