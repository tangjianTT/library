$(function(){
    $("body").delegate(".reedit","click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var reeditObj = $(this);
            var articleId = reeditObj.parent().attr("data");
            window.location.href="/article/reedit/"+articleId;
        } else {
            layer.msg("请先登录");
        }
    })

    // 删除文章

    $("body").delegate(".delete","click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var deleteObj = $(this);
            var articleId = deleteObj.parent().attr("data").trim();
            layer.confirm('确定删除这篇文章？', {
                title:"确定删除",
                btn: ['删除','取消'] //按钮
            }, function(){
                $.ajax({
                    type:"POST",
                    url:"/article/delete/"+articleId,
                    dataType:"json",
                    data:{
                        "articleId":articleId
                    },
                    success:function (result) {
                        var code = result.code;
                        if (code == 1){
                            layer.msg("删除成功");
                            setTimeout(location.reload(), 500);
                        } else if (code == 2){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("删除失败");
                        }
                    },
                    error:function (error) {
                        layer.msg("错误");
                    }
                })

            }, function(){
            });

        } else {
            layer.msg("请先登录");
        }
    })

    $("body").delegate(".like","click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var likeObj = $(this);
            var articleId = likeObj.parent().attr("data");
            var isLike = likeObj.attr("liked");
            if(isLike == 0){
                likeOrCollectArticle(likeObj, articleId, 0);
            } else if(isLike == 1){
                deleteLikeOrCollectArticle(likeObj, articleId, 0);
            }
		} else {
        	layer.msg("请先登录");
		}
	})

    $("body").delegate(".collect", "click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != "") {
            var collectObj = $(this);
            var articleId = collectObj.parent().attr("data");
            var isCollect = collectObj.attr("collected");
            if (isCollect == 0) {
                likeOrCollectArticle(collectObj, articleId, 1);
            } else if(isCollect == 1){
				deleteLikeOrCollectArticle(collectObj, articleId, 1);
            }
        } else {
            layer.msg("请先登录");
        }
	})

    $("body").delegate(".participate-activity", "click", function(){
        var participateObj = $(this);
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != "") {
            var participateImg = participateObj.find("img");
            var participateSpan = participateObj.find("span")
            var isParticipated = participateImg.attr("data");
            var isActivity = participateObj.find("a").attr("isActivity");
            console.log(isActivity);
            var activityId = participateObj.find("a").attr("data");
            if (isActivity == 1){
                if (isParticipated == 0){
                    participateActivity(participateObj, participateImg, participateSpan, activityId);
                } else if (isParticipated == 1){
                    cancelParticipateActivity(participateObj, participateImg, participateSpan, activityId);
                }
            } else {
                layer.msg("活动已过期");
            }

        } else {
            layer.msg("请先登录");
        }
    })

    $("body").delegate(".edit-activity","click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var reeditObj = $(this);
            var activityId = reeditObj.parent().attr("data");
            window.location.href="/activity/reedit/"+activityId;
        } else {
            layer.msg("请先登录");
        }
    })

    // 删除活动
    $("body").delegate(".delete-activity","click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            layer.confirm('确定删除这个活动？', {
                title:"确认删除",
                btn: ['删除','取消'] //按钮
            }, function(){
                var deleteObj = $(this);
                var activityId = deleteObj.parent().attr("data");
                $.ajax({
                    type:"POST",
                    url:"/activity/delete/"+activityId,
                    dataType:"json",
                    data:{
                        "activityId":activityId
                    },
                    success:function (result) {
                        var code = result.code;
                        if (code == 1){
                            layer.msg("删除成功");
                            deleteObj.parent().parent().parent().parent().remove();
                        } else if (code == 2){
                            layer.msg("请先登录");
                        } else {
                            layer.msg("删除失败");
                        }
                    },
                    error:function (error) {
                        layer.msg("错误");
                    }
                })
            }, function(){
            });
        } else {
            layer.msg("请先登录");
        }
    })
})

function likeOrCollectArticle(obj, articleId, type) {
    $.ajax({
        type:"POST",
        url:"/article/likeOrCollectArticle",
        dataType:"json",
        data:{
            "articleId": articleId,
            "type": type
        },
        success: function (result) {
            if (result.code == 1){
                if (type == 0){
                    var num;
                    var numDiv = obj.children().eq(1);
                    var isLike = obj.attr("liked");
                    if(isLike == 0) {
                        obj.find("img").attr("src", "/image/icon/liked.svg");
                        num = parseInt(numDiv.attr("data")) + 1;
                        obj.attr("liked", 1);
                        obj.css("color", "#1dc400");
                        numDiv.attr("data", num);
                        numDiv.text(num);
                    }
                } else if (type == 1){
                    var num;
                    var numDiv = obj.children().eq(1);
                    var isCollect = obj.attr("collected");
                    if (isCollect == 0) {
                        obj.find("img").attr("src", "/image/icon/collected.svg");
                        num = parseInt(numDiv.attr("data")) + 1;
                        obj.attr("collected", 1);
                        obj.css("color", "#1dc400");
                        numDiv.attr("data", num);
                        numDiv.text(num);
                    }
                }
            } else if (result.code == 3){
                layer.msg("出现未知错误，请刷新重试");
            }
        },
        error: function (error) {
            alert("error")
        }
    })
}

function deleteLikeOrCollectArticle(obj, articleId, type) {
    $.ajax({
        type:"POST",
        url:"/article/deleteLikeOrCollectArticle",
        dataType:"json",
        data:{
            "articleId": articleId,
            "type": type
        },
        success: function (result) {
            if (result.code == 1){
                if (type == 0){
                    var num;
                    var numDiv = obj.children().eq(1);
                    var isLike = obj.attr("liked");
                    if(isLike == 1) {
                        obj.find("img").attr("src","/image/icon/like.svg");
                        num = parseInt(numDiv.attr("data")) - 1;
                        obj.attr("liked", 0);
                        obj.css("color","#b2bac2");
                        numDiv.attr("data", num);
                        numDiv.text(num);
                    }
                } else if (type == 1){
                    var num;
                    var numDiv = obj.children().eq(1);
                    var isCollect = obj.attr("collected");
                    if (isCollect == 1) {
                        obj.find("img").attr("src", "/image/icon/collect.svg");
                        num = parseInt(numDiv.attr("data")) - 1;
                        obj.attr("collected", 0);
                        obj.css("color","#b2bac2");
                        numDiv.attr("data", num);
                        numDiv.text(num);
                    }
                }
            } else if (result.code == 3){
                layer.msg("出现未知错误，请刷新重试");
            }
        },
        error: function (error) {
            alert("error")
        }
    })
}

function participateActivity(participateObj, participateImg, participateSpan, activityId) {
    $.ajax({
        type:"POST",
        url:"/activity/participateActivity",
        dataType:"json",
        data:{
            "activityId": activityId
        },
        success: function (result) {
            if (result.code == 1){
                participateObj.attr("title", "取消参加");
                participateImg.attr("data", 1);
                participateImg.attr("src", "/image/icon/participated.svg");
                participateSpan.addClass("participated-style");
                participateSpan.html("已参加");
                var numObj = $(".participate-num");
                var num = numObj.attr("data");
                numObj.attr("data", parseInt(num) + 1);
                numObj.html(parseInt(num) + 1);
            } else {
                layer.msg("出现未知错误，请刷新重试");
            }
        },
        error: function (error) {
            alert("error")
        }
    })
}

function cancelParticipateActivity(participateObj, participateImg, participateSpan, activityId) {
    $.ajax({
        cache: false,
        type:"POST",
        url:"/activity/cancelParticipateActivity",
        dataType:"json",
        data:{
            "activityId": activityId
        },
        success: function (result) {
           if (result.code == 1){
                participateObj.attr("title", "参加活动");
                participateImg.attr("data", 0);
                participateImg.attr("src", "/image/icon/participate.svg");
                participateSpan.html("");
                participateSpan.removeClass("participated-style");
                var numObj = $(".participate-num");
                var num = numObj.attr("data");
                numObj.attr("data", parseInt(num) - 1);
                numObj.html(parseInt(num) - 1);
            } else {
                layer.msg("出现未知错误，请刷新重试");
            }
        },
        error: function (error) {
            alert("error")
        }
    })
}