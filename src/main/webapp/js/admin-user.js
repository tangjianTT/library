$(function(){
	// 总条数
	var totalPage = "";
	// 每页条数
	var onePageNumber = 20;
	// 分页数
	var count = 20;

	$.ajax({
		type:"GET",
		url:"/admin/getUserNumber",
		dataType:"json",
		success:function(result) {
			totalPage = result.userNumber;
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

	$(".searchUser").on("click", function(){
		var keyword = $(".input-search").val().trim();
		if(keyword != null && keyword != ""){
			$.ajax({
				type:"GET",
				url:"/admin/getUserListByKeyword",
				dataType:"json",
				data:{
					"keyword":keyword
				},
				success:function(result){
					var userList = result.userList;
					buildUserList(userList);
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
            url:"/admin/getUserList",
            dataType:"json",
            data:{
                "offset":0,
                "number":onePageNumber
            },
            success:function(result){
                var userList = result.userList;
                buildUserList(userList);
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

    $("body").delegate(".delete-user", "click", function () {
        var deleteObj = $(this);
        var userId = deleteObj.attr("data");
        var status = deleteObj.attr("status");
        if(status == 0) {
            layer.confirm('确定禁用？', {
                btn: ['确定','取消'] //按钮
            }, function(){

                $.ajax({
                    type:"POST",
                    url:"/admin/disabledUser/"+userId,
                    dataType:"json",
                    success:function (result) {
                        var code = result.code;
                        if(code == 1) {
                            var obj = deleteObj.parent().prev().prev().find("span");
                            deleteObj.attr("status", 1);
                            layer.msg("禁用成功")
                            obj.removeClass("label-success");
                            obj.text("禁用");
                            obj.addClass("label-danger");
                        }
                    }
                })
            }, function(){
            });
        } else {
            $.ajax({
                type:"POST",
                url:"/admin/enableUser/"+userId,
                dataType:"json",
                success:function (result) {
                    var code = result.code;
                    if(code == 1) {
                        var obj = deleteObj.parent().prev().prev().find("span");
                        deleteObj.attr("status", 0);
                        layer.msg("取消禁用成功")
                        obj.removeClass("label-danger");
                        obj.text("正常");
                        obj.addClass("label-success");
                    }
                }
            })
		}

    })

	function buildUserList(userList){
		var userTable = $(".user-table tbody");
		userTable.empty();
		var len = userList.length;
		if(len > 0){
			var data = "";
			for(var i = 0; i < len; i++){
				var user = userList[i]
				var userId = user.userId;
				var index = user.index;
				var nickname = user.nickname;
				var sex = user.sex;
				var job = user.job;
				if (job == null || job == "") {
					job = "";
				}
				var phoneNumber = user.phoneNumber;
                if (phoneNumber == null || phoneNumber == "") {
                    phoneNumber = "";
                }
				var email = user.email;
                if (email == null || email == "") {
                    email = "";
                }
				var status = user.status;
				var statusSpan = "";
				if(status == 0) {
					statusSpan = '<span class="label label-success label-mini">正常</span>';
				} else {
					statusSpan = '<span class="label label-danger label-mini">禁号</span>';
				}
				var registrationTime = user.registrationTime;
				
				data += '<tr>' +
							'<th>'+index+'</th>' +
							'<td><a href="/user/homepage/'+userId+'" target="_blank">'+nickname+'</a></td>' +
							'<td>'+sex+'</td>' +
							'<td>'+job+'</td>' +
							'<td class="hidden-phone">'+phoneNumber+'</td>' +
							'<td>'+email+'</td>' +
							'<td>'+statusSpan+'</td>' +
							'<td>'+registrationTime+'</td>' +
							'<td>' +
								'<a href="/user/homepage/'+userId+'" target="_blank">' +
									'<button class="btn btn-primary btn-xs" title="查看">' +
										'<i class="icon-eye-open"></i>' +
									'</button>' +
								'</a>  ' +
								'<button class="btn btn-danger btn-xs delete-user" title="禁用/解封" status="'+status+'" data="'+userId+'">' +
									'<i class="icon-minus-sign"></i>' + 
								'</button>' +
							'</td>' +
						'</tr>';
			}
			userTable.html(data);
		}
		
	}
})


