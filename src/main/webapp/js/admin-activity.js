$(function(){
// 总条数
    var totalPage = "";
    // 每页条数
    var onePageNumber = 20;
    // 分页数
    var count = 20;

    $.ajax({
        type:"GET",
        url:"/admin/getActivityNumber",
        dataType:"json",
        success:function(result) {
            totalPage = result.activityNumber;
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

    getActivityList(0, onePageNumber);

    $(".searchActivity").on("click", function(){
        var keyword = $(".input-search").val().trim();
        if(keyword != null && keyword != ""){
            $.ajax({
                type:"GET",
                url:"/admin/getActivityListByKeyword",
                dataType:"json",
                data:{
                    "keyword":keyword
                },
                success:function(result){
                    var activityList = result.activityList;
                    buildActivityList(activityList);
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
            getActivityList(offset, onePageNumber)
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
                getActivityList(offset, onePageNumber)
                $("#current").text(current)
            }
        });
    }

    function getActivityList(offset, onePageNumber) {
        $.ajax({
            type:"GET",
            url:"/admin/getActivityList",
            dataType:"json",
            data:{
                "offset":0,
                "number":onePageNumber
            },
            success:function(result){
                var activityList = result.activityList;
                buildActivityList(activityList);
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

    // 删除

    $("body").delegate(".delete-activity", "click", function () {
        var deleteObj = $(this);
        var state = deleteObj.attr("state");
        if(state == 1) {
            layer.confirm('确定删除？', {
                btn: ['删除','取消'] //按钮
            }, function(){
                var activityId = deleteObj.attr("data");
                $.ajax({
                    type:"POST",
                    url:"/admin/deleteActivity/"+activityId,
                    dataType:"json",
                    success:function (result) {
                        var code = result.code;
                        if(code == 1) {
                            var obj = deleteObj.parent().prev().prev().find("span");
                            deleteObj.attr("state", 0);
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

	function buildActivityList(activityList){
		var activityTable = $(".activity-table tbody");
		activityTable.empty();
		var len = activityList.length;
		if(len > 0){
			var data = "";
			for(var i = 0; i < len; i++){
				var activity = activityList[i]
				var index = activity.index;
				var activityId = activity.activityId;
				var userId = activity.userId;
				var title = activity.title;
				var nickname = activity.nickname;
				var place = activity.place;
				var participateNum = activity.participateNum;
				var startTime = activity.startTime;
				var publishTime = activity.publishTime;
				var state = parseInt(activity.state);
				var stateSpan = "";
				if(state == 1){
					// 正常
					stateSpan = '<span class="label label-success label-mini">正常</span>';
				} else if(state == 0) {
					stateSpan = '<span class="label label-danger label-mini">删除</span>';
				} else {
					stateSpan = '<span class="label label-inverse label-mini">过期</span>';
				}
				data += '<tr>' +
							'<th> '+index+'</th>' +
							'<td><a href="/activity/look/'+activityId+'" target="_blank"> '+title+'</a></td>' +
							'<td><a href="/user/homepage/'+userId+'"> '+nickname+'</a></td>' +
							'<td> '+place+'</td>' +
							'<td> '+startTime+'</td>' +
							'<td> '+participateNum+'</td>' +
							'<td>'+stateSpan+'</td>' +
							'<td> '+publishTime+'</td>' +
							'<td>' +
								'<a href="/activity/look/\'+activityId+\'" target="_blank">' +
									'<button class="btn btn-primary btn-xs" title="查看">' +
										'<i class="icon-eye-open"></i>' +
									'</button>' +
								'</a>  ' +
								'<button class="btn btn-danger btn-xs delete-activity" title="删除" state="'+state+'" data="'+activityId+'">' +
									'<i class="icon-minus-sign"></i>' +
								'</button>' +
							'</td>' +
						'</tr>';
			}
			activityTable.html(data);
		}
		
	}
})


