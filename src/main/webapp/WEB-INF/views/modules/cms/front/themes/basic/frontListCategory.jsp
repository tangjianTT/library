<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>

	<title>${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${category.description}" />
	<meta name="keywords" content="${category.keywords}" />
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
  <link type="text/css" href="${path}/css/cus.css" rel="stylesheet"> 
   <script src="http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js"></script>
<script type="text/javascript" src="${path}/static/layer/layer.js"></script>
</head>
<body>
	<div class="row">
	   <div class="span2">
	   	 <h4 style="background-color:red;color: white">栏目列表</h4>
		 <ol>
<%--  		 	<cms:frontCategoryList categoryList="${categoryList}"/>
 --%> 	    <c:forEach items="${categoryList}" var="category">
 	         <li>
		 	   <a href="${ctx}/list-${category.id}.html?userId=${sessionScope.user.id}">
		 	${category.name}	   
		 	   </a>
		 	   </li>
		 	 </c:forEach>
		 </ol>
		 <h4 style="background-color:red;color: white">推荐阅读</h4>
		 <ol>
		 	<cms:frontArticleHitsTop category="${category}"/>
		 </ol>
	   </div>
	   <div class="span10">
		 <ul class="breadcrumb" style="background-color: red;color: white">
		    <cms:frontCurrentPosition category="${category}"/>
		 </ul>
	   </div>
	   <div class="span10">
	      <c:set var="index" value="1"/>
	     <%--  <c:forEach items="${actOrganizationList}" var="tpl">
	        ${tpl.title}
	      </c:forEach> --%>
		  <c:forEach items="${categoryList}" var="tpl">
			<c:if test="${tpl.inList eq '1' && tpl.module ne ''}">
				<c:set var="index" value="${index+1}"/>
				${index % 2 eq 0 ? '<div class="row">':''}
		    	<div class="span5">
		    	<c:if test="${tpl.name ne '组织活动'}">
		    		<h4 style="background-color: red;color: white"><small><a href="${ctx}/list-${tpl.id}${urlSuffix}" class="pull-right">更多&gt;&gt;</a></small>${tpl.name}</h4>
					<c:if test="${tpl.module eq 'article'}">
		    		  <ul><c:forEach items="${fnc:getArticleList(site.id, tpl.id, 5, '')}" var="article">
							<li><span class="pull-right"><fmt:formatDate value="${article.updateDate}" pattern="yyyy.MM.dd"/></span><a href="${ctx}/view-${article.category.id}-${article.id}${urlSuffix}" style="color:${article.color}">${fns:abbr(article.title,40)}</a></li>
						</c:forEach></ul >   
					</c:if>
					<c:if test="${tpl.module eq 'link'}">
		    			<ul><c:forEach items="${fnc:getLinkList(site.id, tpl.id, 5, '')}" var="link">
							<li><span class="pull-right"><fmt:formatDate value="${link.updateDate}" pattern="yyyy.MM.dd"/></span><a target="_blank" href="${link.href}" style="color:${link.color}">${fns:abbr(link.title,40)}</a></li>
						</c:forEach></ul>
					</c:if>
					</c:if>
					
					<c:if test="${tpl.name eq '组织活动'}">
		    		<h4 style="background-color: red;color: white;width: 767px"><small><a href="${ctx}/list-${tpl.id}${urlSuffix}" class="pull-right">更多&gt;&gt;</a></small>${tpl.name}</h4>
					<c:if test="${tpl.module eq 'article'}">
		    		  <!-- <ul> -->
		    		   <div class="over_h" id="activityList" style="width: 839px;height: 950px;">	
					 <c:forEach items="${actOrganizationList}" var="actOrganization">
				 		<div class="p_re over_h p_b_20 m_t_20" style="border-bottom:1px solid #ccc;">	
				 			 <c:set var="nowDate" value="<%=System.currentTimeMillis()%>"></c:set>
	                     	<c:if test="${nowDate - actOrganization.startDate.time > 0 && nowDate - actOrganization.endDate.time < 0}">
				              <i class="p_ab activityTag activityTag_doing"></i></c:if>
 				             
 				          <c:if test="${nowDate - actOrganization.startDate.time <0 && nowDate - actOrganization.endDate.time <0}">
 				             <i class="p_ab activityTag activityTag_well"> </i>
 				             </c:if>
 				             
 				              <c:if test="${nowDate - actOrganization.endDate.time >0}">
 				           <i class="p_ab activityTag activityTag_close"></i></c:if>
 				           
				 			<div style="width:240px;height:150px;overflow:hidden;float:left;">	
				 			<img class="pull-left" width="240" src="/party-build/images/activity_default.png" alt="">	
				 			</div>															
				 			<div class="pull-left m_l_15" style="width:555px;height:150px;">			
				 			<!-- <h4 class="act_h" style="background-color: white;width: 518px;margin :-13px;height: 25px;"> -->
				 			<p style="color:black">${fns:abbr(actOrganization.title,40)}</p>
				 			<!-- </h4>	 -->
				 			<p class="color_999 m_t_10 p_t_15" style="margin:-12px">
				 			<span > &nbsp;&nbsp;${actOrganization.office.name}</span></p>
				 			<span class="font_12 display_block p_l_30 m_t_10 activity_icon_address" style="background-position: -1% 44%;background-position: -1% 44%;margin-top: 14px;">${actOrganization.place}</span>
				 			<span class="font_12 display_block p_l_30 m_t_10 activity_icon_time" style="background-position: -0.9% 49.8%;"> <fmt:formatDate value="${actOrganization.startDate}" pattern="yyyy-MM-dd HH:mm:ss"/>    至   <fmt:formatDate value="${actOrganization.endDate}" pattern="yyyy-MM-dd HH:mm:ss"/>  </span>	
				 			<span class="font_12 display_block p_l_30 m_t_10 activity_icon_address" style="background-position: -1% 60%;">${actOrganization.actDescribe}    </span>		</div>						
				 			<div class="p_ab over_h" style="right:40px;top:45px;width:104px;">	
				 			<i class="pull-left color_999 p_l_30 numActivity display_block"><i class="color_f1342c">${actOrganization.count}</i><i class="color_999 display_none">/ ${actOrganization.count} 人</i></i>																									        
			 			   <c:if test="${actOrganization.flag ne '1'}">
			 			   <input  type="button" class="activitySignUp text-center font_14" onclick="signUp('${actOrganization.id}')" value="点击报名" >
				 			</c:if>
				 			<c:if test="${actOrganization.flag eq '1'}">
				 			 <input  type="button" class="activitySignUp text-center font_14"  readonly="readonly" value="已报名" >
				 			</c:if>
				 			</div>					
				 			</div>		
						    </c:forEach>
						    </div>
						<!--  </ul >   -->
					</c:if>
					</c:if>
		    	</div>
		    	${index % 2 ne 0 ? '</div>':''}
			</c:if>
		  </c:forEach>
	   </div>
	</div>
	
	<script type="text/javascript">
	 function signUp(actOrganizationId){
		　var user="<%=session.getAttribute("user")%>"; 
		 if(user == "null"){ 
	   　      layer.msg("登录过后才能报名哦", {
	   　     	  icon: 2,
	         	  time: 2000 //2秒关闭（如果不配置，默认是3秒）
	         	},function(){});
	   　      return true;
		 }
		  $.ajax({
	            type : "GET",
	            url : "${ctx}/signUp",
	            dataType:"json", //返回的数据类型
	            /*contentType: "application/json; charset=utf-8",*/
	            data:{
	                    "actOrganizationId" : actOrganizationId,
	                    "userId" : user ,
	            },
	            success:function(result){
	                switch(result.code) {
	                    case 0:
	                        alert("报名成功")
	                        location.href="${ctx}/list-${category.id}.html?userId=${sessionScope.user.id}";
	                        break;
	                    case 1:
	                        layer.msg("报名失败");
	                        break;
	                    default:
	                        break;
	                }
	            },
	            error:function(error){
	                layer.msg("报名失败");
	            }
	    })
	 }
	
	</script>
</body>
</html>