<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>首页</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="JeeSite ${site.description}" />
	<meta name="keywords" content="JeeSite ${site.keywords}" />
	<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
  <link type="text/css" href="${path}/css/login-register.css" rel="stylesheet"> 
 <script src="http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js"></script>
</head>
<body>



    <div class="hero-unit" style="padding-bottom:35px;margin:150px 0 10px; opacity:0.7;  ">
      <c:set var="article" value="${fnc:getArticle('1')}"/>
      <h1>${fns:abbr(article.title,28)}</h1><p></p>
      <p>${fns:abbr(fns:replaceHtml(article.articleData.content),260)}</p>
      <p><a href="${article.url}" class="btn btn-primary btn-large">&nbsp;&nbsp;&nbsp;查看详情 &raquo;&nbsp;&nbsp;&nbsp;</a></p>
    </div>
    <div class="row">
      <div class="span4" style="margin-left: 34px;">
        <h4 style="background-color:red;color: white"><small><a href="${ctx}/list-2${urlSuffix}" class="pull-right">更多&gt;&gt;</a></small>图馆介绍</h4>
		<ul><c:forEach items="${fnc:getArticleList(site.id, 2, 8, '')}" var="article">
			<li><img src="${article.image}"><span class="pull-right"><fmt:formatDate value="${article.updateDate}" pattern="yyyy.MM.dd"/></span><a href="${article.url}" style="color:${article.color}">${fns:abbr(article.title,28)}</a></li>
		</c:forEach></ul>
      </div>
      <div class="span4" style="margin-left: 34px;">
        <h4 style="background-color:red;color: white"> <small><a href="${ctx}/list-6${urlSuffix}" class="pull-right">更多&gt;&gt;</a></small>在线阅书</h4>
		<ul><c:forEach items="${fnc:getLinkList(site.id, 6, 4, '')}" var="link">
			<li><span class="pull-right"><fmt:formatDate value="${link.updateDate}" pattern="yyyy.MM.dd"/></span><a href="${link.href}" style="color:${link.color}">${fns:abbr(link.title,28)}</a></li>
		</c:forEach></ul>
      </div>
      <div class="span4" style="margin-right: -9px;margin-left: 34px;">
        <h4 style="background-color:red;color: white"><small><a href="${ctx}/list-10${urlSuffix}" class="pull-right">更多&gt;&gt;</a></small>特别报道</h4>
		<ul><c:forEach items="${fnc:getArticleList(site.id, 10, 8, '')}" var="article">
			<li><span class="pull-right"><fmt:formatDate value="${article.updateDate}" pattern="yyyy.MM.dd"/></span><a href="${article.url}" style="color:${article.color}">${fns:abbr(article.title,28)}</a></li>
		</c:forEach></ul>
      </div>
    </div>
</body>
</html>