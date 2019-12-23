$(function(){

    $(".reply-list").hide()
	$('.comment-btn').hide();
	 $('.comment textarea').focus(function(){
    	$(this).css('border', '1px solid #007fff')
    	$('.comment-btn').show();
    })
    $('.comment textarea').blur(function(){
    	var text = $('#my-conment').val();
    	if('' == $.trim(text)){
    		$(this).css('border', '')
    		$('.comment-btn').hide();
    	}
    })
    
    $('.show-reply').click(function(){
    	$('.reply-div').toggle();
    })

    $(".show").on("click", function () {
        var commentId = $(this).attr("data");
        var reply = $("#" + commentId);
        var isShow = reply.attr("isShow");
        if (isShow == 0){
            getReplyList(commentId);
            reply.attr("isShow", 1);
            reply.show();
        } else {
            reply.hide();
            reply.attr("isShow", 0);
        }

    })

    // 发表评论
    $("#my-comment-btn").on("click", function () {
        var userId = $("#user-head-pic").attr("data");
        if (userId != null && userId != ""){
            var articleId = $(".title").attr("data");
            var content = $("#my-conment").val();
            var isParent = 1;
            var data = '{"articleId":"'+ articleId +
                '", "userId":"'+ userId +
                '", "content":"'+ content +
                '", "isParent":'+ isParent + '}';
            $.ajax({
                type:"POST",
                url:"/article/addComment",
                dataType:"json",
                data:{
                    "commentJson":data,
                    "isComment": 1
                },
                success:function(result){
                    if (result.code == 1){
                        location.reload();
                    } else if(result.code == 0){
                        layer.msg("评论失败");
                        return;
                    } else {
                        layer.msg("登录失效，请登录", function () {})
                        return
                    }
                },error:function(error){
                    alert("错误");
                }
            })
        } else {
            layer.msg("请先登录", function () {})
            return
        }
    })

})

// 发表回复 $(".reply_btn").on("click",
function addReply(obj) {
    var object = $(obj);
    var userId = $("#user-head-pic").attr("data");
    if (userId != null && userId != ""){
        var content = object.prev().val();
        if(content == null || content == ""){
            layer.msg("请输入回复内容", function () { });
            return;
        }
        var articleId = $(".title").attr("data");
        var isParent = 0;
        var parentId = object.parent().parent().attr("id");
        var data = '{"articleId":"'+ articleId +
            '", "userId":"'+ userId +
            '", "content":"'+ content +
            '", "isParent":'+ isParent +
            ',"parentId":"' + parentId +'"}';
        $.ajax({
            type:"POST",
            url:"/article/addComment",
            dataType:"json",
            data:{
                "commentJson":data,
                "isComment": 0
            },
            success:function(result){
                if (result.code == 1){
                    layer.msg("回复成功")
                    getReplyList(parentId);
                } else if(result.code == 0){
                    layer.msg("评论失败");
                    return;
                } else {
                    layer.msg("登录失效，请登录", function () {})
                    return
                }
            },error:function(error){
                alert("错误");
            }
        })
    } else {
        layer.msg("请先登录", function () {})
        return
    }
}

function getReplyList(commentId) {
    if(commentId != null && commentId != ""){
        $.ajax({
            type:"POST",
            url:"/article/getReplyList",
            dataType:"json",
            data:{
                "commentId":commentId
            },
            success:function(result){
                if (result.code == 1){
                    var replyList = result.replyList;
                    buildReplyList(replyList, commentId)
                } else {
                    buildReplyList(null, commentId)
                }
            },error:function(error){
                alert("错误");
            }
        })
    }
}

function buildReplyList(replyList, commentId) {
    var data = "";
    if (replyList != null){
        for (var index = 0; index < replyList.length; index++){
            var reply = replyList[index];
            var userId = reply.userId;
            var headPic = reply.headPic;
            var nickname = reply.nickname;
            var job = reply.job;
            var jobContext = "";
            if (job != null || job != ""){
                jobContext = job;
            }
            var replyName = reply.replyName;
            var replySpan = replyName;
            if(replyName != null && replyName != ""){
                replySpan = '回复&nbsp;<a>' + replyName +'</a>&nbsp;:&nbsp;';
            } else {
                replySpan = "";
            }
            var content = reply.content;
            var replyTime = timestampToTime(reply.commentTime);
            data += '<li>\n' +
                '    <div class="user-base-info">\n' +
                '        <div>\n' +
                '            <a href="/user/homepage/'+userId+'" class="head-name">\n' +
                '                <img src="/image/head-pic/'+ headPic +'" class="head-img-small" />\n' +
                '                <span class="comment-user-name"><b>'+ nickname +'</b></span>\n' +
                '            </a>\n' +
                '        </div>\n' +
                '        <div>\n' +
                '            <span class="job">'+ jobContext +'</span>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="reply-content">\n' +
                '        <span>'+ replySpan +'\n' + content +
                '        </span>\n' +
                '    </div>\n' +
                '    <div class="reply-operate">\n' +
                '        <span class="time">'+replyTime+'</span>\n' +
                '        <a href="javascript:void(0);" class="reply" data="'+ replyName +'">回复</a>\n' +
                '    </div>\n' +
                '</li>\n';
        }
    }
    data += '<div class="reply-input">\n' +
        '    <textarea placeholder="说说你的看法"></textarea>\n' +
        '    <input type="button" class="reply_btn" value="回复" onclick="addReply(this)"/>\n' +
        '</div>';
    $("#" + commentId).html(data);
}


function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = date.getDate() + '日 ';
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() ;
    return Y+M+D+h+m+s;
}