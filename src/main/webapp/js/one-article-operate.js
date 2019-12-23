$(function(){
	$('#like').on("click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var isLike = $("#like").attr("liked");
            var articleId = $("#like").parent().attr("data");
            if(isLike == 0){
                likeOrCollectArticle(articleId, 0);
            } else if(isLike == 1) {
               deletelikeOrCollectArticle(articleId, 0);
            }
		} else {
        	layer.msg("请先登录");
		}

	})
	
	$('#collect').on("click", function(){
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var isCollect = $("#collect").attr("collected");
            var articleId = $("#like").parent().attr("data");
            if(isCollect == 0){
                likeOrCollectArticle(articleId, 1);
            } else if(isCollect == 1){
                deletelikeOrCollectArticle(articleId, 1);
            }
        } else {
            layer.msg("请先登录");
        }
	})
})

function likeOrCollectArticle(articleId, type) {
    $.ajax({
        type:"POST",
        url:"/article/likeOrCollectArticle",
        dataType:"json",
        data:{
            "articleId": articleId,
            "type": type
        },
        success: function (result) {
            if (result.code == 2){
                layer.msg("请先登录");
            } else if (result.code == 1){
                if (type == 0){
                    var isLike = $("#like").attr("liked");
                    var likeNum = $(".like-num");
                    if(isLike == 0) {
                        $("#like img").attr("src", "/image/icon/liked.svg");
                        var num = parseInt(likeNum.attr("data")) + 1;
                        likeNum.addClass("liked");
                        $("#like").attr("liked", 1);
                        likeNum.attr("data", num);
                        likeNum.text(num);
                    }
                } else if (type == 1){
                    var isCollect = $("#collect").attr("collected");
                    var collectNum = $(".collect-num");
                    if(isCollect == 0){
                        $("#collect img").attr("src","/image/icon/collected.svg");
                        var num = parseInt(collectNum.attr("data")) + 1;
                        collectNum.addClass("collected");
                        $("#collect").attr("collected", 1);
                        collectNum.attr("data", num);
                        collectNum.text(num);
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

function deletelikeOrCollectArticle(articleId, type) {
    $.ajax({
        type:"POST",
        url:"/article/deleteLikeOrCollectArticle",
        dataType:"json",
        data:{
            "articleId": articleId,
            "type": type
        },
        success: function (result) {
            if (result.code == 2){
                layer.msg("请先登录");
            } else if (result.code == 1){
                if (type == 0){
                    var isLike = $("#like").attr("liked");
                    var likeNum = $(".like-num");
                    if(isLike == 1) {
                        $("#like img").attr("src","/image/icon/like.svg");
                        var num = parseInt(likeNum.attr("data")) - 1;
                        likeNum.removeClass("liked");
                        $("#like").attr("liked",0);
                        likeNum.attr("data", num);
                        likeNum.text(num);
                    }
                } else if (type == 1){
                    var isCollect = $("#collect").attr("collected");
                    var collectNum = $(".collect-num");
                    if(isCollect == 1){
                        $("#collect img").attr("src","/image/icon/collect.svg");
                        num = parseInt(collectNum.attr("data")) - 1;
                        collectNum.removeClass("collected");
                        $("#collect").attr("collected", 0);
                        collectNum.attr("data", num);
                        collectNum.text(num);
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