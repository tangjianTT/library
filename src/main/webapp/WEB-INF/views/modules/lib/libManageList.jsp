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
		<li class="active"><a href="${ctx}/lib/libManage/">图书列表</a></li>
		<shiro:hasPermission name="lib:libManage:edit"><li><a href="${ctx}/lib/libManage/form">图书添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="libManage" action="${ctx}/lib/libManage/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>所属院校：</label>
				<sys:treeselect id="office" name="office.id" value="${libManage.office.id}" labelName="office.name" labelValue="${libManage.office.name}"
					title="部门" url="/sys/office/treeData?type=2" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>图书编号：</label>
				<form:input path="bookId" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>图书名称：</label>
				<form:input path="bookName" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>图书分类：</label>
				<form:select path="bookClassify" class="input-medium">
					<form:option value="" label=""/>
					<form:options items="${fns:getDictList('book_classify')}" itemLabel="label" itemValue="value" htmlEscape="false"/>
				</form:select>
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
				<th>图书编号</th>
				<th>图书名称</th>
				<th>图书分类</th>
				<th>图书位置</th>
				<th>数量</th>
				<th>入库日期</th>
				<shiro:hasPermission name="lib:libManage:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="libManage">
			<tr>
				<td><a href="${ctx}/lib/libManage/form?id=${libManage.id}">
					${libManage.office.name}
				</a></td>
				<td>
					${libManage.bookId}
				</td>
				<td>
					${libManage.bookName}
				</td>
				<td>
					${fns:getDictLabel(libManage.bookClassify, 'book_classify', '')}
				</td>
				<td>
					${libManage.bookPlace}
				</td>
				<td>
					${libManage.count}
				</td>
				<td>
					<fmt:formatDate value="${libManage.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<shiro:hasPermission name="lib:libManage:edit"><td>
    				<a href="${ctx}/lib/libManage/form?id=${libManage.id}">修改</a>
					<a href="${ctx}/lib/libManage/delete?id=${libManage.id}" onclick="return confirmx('确认要删除该图书吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>