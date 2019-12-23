<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>我的评论管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		function view(href){
			top.$.jBox.open('iframe:'+href,'查看文档',$(top.document).width()-220,$(top.document).height()-180,{
				buttons:{"关闭":true},
				loaded:function(h){
					//$(".jbox-content", top.document).css("overflow-y","hidden");
					//$(".nav,.form-actions,[class=btn]", h.find("iframe").contents()).hide();
				}
			});
			return false;
		}
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
		<li class="active"><a href="${ctx}/cmm/personalComment">我的评论列表</a></li>
	</ul>
	<form:form id="searchForm" modelAttribute="comment" action="${ctx}/cmm/personalComment" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
<%-- 		<label>文档标题：</label><form:input path="title" htmlEscape="false" maxlength="50" class="input-small"/>&nbsp;
 --%>		<%-- <input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/>&nbsp;&nbsp;
		<label>状态：</label><form:radiobuttons onclick="$('#searchForm').submit();" path="delFlag" items="${fns:getDictList('cms_del_flag')}" itemLabel="label" itemValue="value" htmlEscape="false" /> --%>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-bordered table-condensed">
		<thead><tr><th>评论内容</th><th>文档标题</th><th>评论IP</th><th>评论时间</th><th>状态</th><shiro:hasPermission name="cmm:personalComment:edit"><th>操作</th></shiro:hasPermission></tr></thead>
		<tbody>
		<c:forEach items="${page.list}" var="comment">
			<tr>
				<td><a href="javascript:" onclick="$('#c_${comment.id}').toggle()">${fns:abbr(fns:replaceHtml(comment.content),40)}</a></td>
				<td><a href="${pageContext.request.contextPath}${fns:getFrontPath()}/view-${comment.category.id}-${comment.contentId}${fns:getUrlSuffix()}" title="${comment.title}" onclick="return view(this.href);">${fns:abbr(comment.title,40)}</a></td>
				<td>${comment.ip}</td>
				<td><fmt:formatDate value="${comment.createDate}" type="both"/></td>
				<td>
				<c:if test="${comment.delFlag eq '0'}">
				已发布
				</c:if>
				<c:if test="${comment.delFlag eq '1'}">
				已驳回
				</c:if>
				<c:if test="${comment.delFlag eq '2'}">
				待审核
				</c:if>	
				</td>
				<shiro:hasPermission name="cmm:personalComment:edit"><td>
					<c:if test="${comment.delFlag ne '2'}"><a href="${ctx}/cmm/personalComment/delete?id=${comment.id}" 
						onclick="return confirmx('确认要删除'}该留言吗？', this.href)">删除</a></c:if>
						
					<c:if test="${comment.delFlag eq '2'}">
					无操作</c:if>
				</td></shiro:hasPermission>
			</tr>
			<tr id="c_${comment.id}" style="background:#fdfdfd;display:none;"><td colspan="6">${fns:replaceHtml(comment.content)}</td></tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>
