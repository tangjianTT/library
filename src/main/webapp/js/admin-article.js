$(function(){
    // 总条数
    var totalPage = "";
    // 每页条数
    var onePageNumber = 20;
    // 分页数
    var count = 20;

    $.ajax({
        type:"GET",
        url:"/admin/getArticleNumber",
        dataType:"json",
        success:function(result) {
            totalPage = result.articleNumber;
            if (totalPage >= onePageNumber) {
                count = parseInt(totalPage)/onePageNumber;
                buildPaging(totalPage, count);
                $(".page-input").removeClass("no-paging")
            } else {
                $(".page-input").addClass("no-paging");
            }
        },
        error:function(error){
            alert("error")
            console.log(error)
        }
    });

    getUserList(0, onePageNumber);

    $(".searchArticle").on("click", function(){
        var keyword = $(".input-search").val().trim();
        if(keyword != null && keyword != ""){
            $.ajax({
                type:"GET",
                url:"/admin/getArticleListByKeyword",
                dataType:"json",
                data:{
                    "keyword":keyword
                },
                success:function(result){
                    var articleList = result.articleList;
                    buildArticleList(articleList);
                    // 不分页
                    buildPaging(0, 0);
                    $(".page-input").addClass("no-paging");
                },
                error:function(error){
                    alert("error");
                }
            });
        }
    })

    $("#getPage").on("click", function() {
        var info = $("#pagination").pagination("getPage");
        console.log("当前页数：" + info.current + ",总页数：" + info.total);
    });

    $("#setPage").on("click", function() {
        var pageNumber = parseInt($(".to-page").val().trim());
        if(pageNumber > 0 && pageNumber <= totalPage) {
            $("#pagination").pagination("setPage", pageNumber, totalPage);
            var offset = pageNumber * onePageNumber;
            getUserList(offset, onePageNumber)
            $("#current").text(pageNumber);
        } else {
            $(".to-page").val("")
        }
    });

    function buildPaging(totalPage, count) {
        $("#pagination").pagination({
            currentPage: 1,
            totalPage: totalPage,
            isShow: true,
            count: count,
            homePageText: "首页",
            endPageText: "尾页",
            prevPageText: "上一页",
            nextPageText: "下一页",
            callback: function(current) {
                var offset = current * onePageNumber;
                getUserList(offset, onePageNumber)
                $("#current").text(current)
            }
        });
    }

    function getUserList(offset, onePageNumber) {
        $.ajax({
            type:"GET",
            url:"/admin/getArticleList",
            dataType:"json",
            data:{
                "offset":0,
                "number":onePageNumber
            },
            success:function(result){
                var articleList = result.articleList;
                buildArticleList(articleList);
                if (totalPage >= onePageNumber) {
                    buildPaging(totalPage, count);
                    $(".page-input").removeClass("no-paging")
                } else {
                    $(".page-input").addClass("no-paging");
                }
            },
            error:function(error){
                alert("error");
            }
        });
    }

    $("body").delegate(".delete-article", "click", function () {
        var deleteObj = $(this);
        var status = deleteObj.attr("status");
        if(status == 1) {
            layer.confirm('确定删除？', {
                btn: ['删除','取消'] //按钮
            }, function(){
                var articleId = deleteObj.attr("data");
                $.ajax({
                    type:"POST",
                    url:"/admin/deleteArticle/"+articleId,
                    dataType:"json",
                    success:function (result) {
                        var code = result.code;
                        if(code == 1) {
                            var obj = deleteObj.parent().prev().prev().find("span");
                            deleteObj.attr("status", 0);
                            layer.msg("删除成功")
                            obj.removeClass("label-success");
                            obj.text("删除");
                            obj.addClass("label-danger");
                        }
                    }
                })
            }, function(){
            });
        }

    })
	
	function buildArticleList(articleList){
		var articleTable = $(".article-table tbody");
		articleTable.empty();
		var len = articleList.length;
		if(len > 0){
			var data = "";
			for(var i = 0; i < len; i++){
				var article = articleList[i];
				var index = article.index;
				var articleId = article.articleId;
				var userId = article.userId;
				var title = article.title;
				var nickname = article.nickname;
				var articleClass = article.articleClass;
				var labels = article.labels;
				if (labels == null || labels == ""){
                    labels = "";
				}
				var likeNum = article.likeNum;
				var collectNum = article.collectNum;
				var commentNum = article.commentNum;
				var status = article.status;
				var statusSpan = "";
				if(status == 1) {
					statusSpan = '<span class="label label-success label-mini">正常</span>';
				} else {
					statusSpan = '<span class="label label-danger label-mini">删除</span>';
				}
				var publishTime = article.publishTime;
				data +='<tr>' +
							'<th> '+index+'</th>' +
							'<td><a href="/article/read/'+articleId+'" target="_blank"> '+title+'</a></td>' +
							'<td><a href="/user/homepage/'+userId+'" target="_blank"> '+nickname+'</a></td>' +
							'<td> '+articleClass+'</td>' +
							'<td> '+labels+'</td>' +
							'<td> '+likeNum+'</td>' +
							'<td> '+collectNum+'</td>' +
							'<td> '+commentNum+'</td>' +
							'<td> '+statusSpan+'</td>' +
							'<td> '+publishTime+'</td>' +
							'<td>' +
								'<a href="/article/read/\'+articleId+\'" target="_blank">' +
									'<button class="btn btn-primary btn-xs" title="查看">' +
										'<i class="icon-eye-open"></i>' +
									'</button>' +
								'</a>  ' +
								'<button class="btn btn-danger btn-xs delete-article" title="禁用" status="'+status+'" data="'+articleId+'">' +
									'<i class="icon-minus-sign"></i>' +
								'</button>' +
							'</td>' +
						'</tr>';
			}
			articleTable.html(data);
		}
		
	}
})


