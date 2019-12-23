$(function(){
    getArticleList("0");
})
function getArticleList(articleClass) {
    if (articleClass != null && articleClass != "" && articleClass > -1 && articleClass < 10){
        var userId = $("#user-head-pic").attr("data");
        $.ajax({
            type:"POST",
            url:"/article/getArticleList",
            dataType:"json",
            data:{
                "articleClass" : articleClass,
                "userId": userId
            },
            success:function (result) {
                var list = result.articleList;
                $('#content').html("");
                if(result.code != 1){
                    layer.msg("此分类暂无文章");
                    return;
                }
                buildArticle(list);
            },
            error:function () {
                layer.msg("未知错误", function () {
                })
            }
        })
    }
}

function buildArticle(articleList) {
    var data = '';
    for (var index = 0; index < articleList.length; index++){
        var article = articleList[index];
        var articleId = article.articleId;
        var title = article.title;
        var content = article.content;
        var userId = article.userId;
        var nickname = article.nickname;
        var publishTime = timestampToTime(article.publishTime);
        var labels = article.labels;
        if (labels != null && labels != ""){
            var labelHtml = '<span class="item-info">·</span>\n' +
                '<span class="item-info">'+ labels +'</span>\n';
            labels = labelHtml;
        }
        var likeNum = article.likeNum;
        var collectNum = article.collectNum;
        var commentNum = article.commentNum;
        var cover = article.cover;
        var liked = article.liked;
        var likeImg = "liked.svg";
        var likeTextCss = 'style="color: #1dc400"';
        if(liked != 1){
            liked = 0;
            likeImg = "like.svg"
            likeTextCss = 'style="color: #b2bac2"';
        }
        var collected = article.collected;
        var collectImg = "collected.svg";
        var collectTextCss = 'style="color: #1dc400"';;
        if(collected != 1){
            collected = 0;
            collectImg = "collect.svg";
            collectTextCss = 'style="color: #b2bac2"';
        }
        data += '<div class="item">\n' +
            '        <div class="content-left">\n' +
            '        <div class="item-title">\n' +
            '        <a href="/article/read/'+ articleId+'" target="_blank" id="'+ articleId +'">\n' +
            '        <h3>'+ title +'</h3>\n' +
            '        </a>\n' +
            '        </div>\n' +
            '        <div class="item-user">\n' +
            '        <span class="item-info"><a href="/user/homepage/'+userId+'" data="'+ userId +'" target="_blank">'+ nickname +'</a></span>\n' +
            '    <span class="item-info">·</span>\n' +
            '    <span class="item-info">'+ publishTime +'</span>\n' + labels +
            '        </div>\n' +
            '        <div class="item-subtitle">\n' +
            '        <ul class="item-subtitle-text" data="'+ articleId +'">\n' +
            '        <li class="like" liked="'+ liked +'" '+likeTextCss+'>\n' +
            '        <div><a href="javascript:void(0);" title="喜欢"><img class="like-img" src="image/icon/'+ likeImg +'" /></a></div>\n' +
            '    <div class="like-num num" data="'+ likeNum +'">'+ likeNum +'</div>\n' +
            '        </li>\n' +
            '        <li class="collect" collected="'+ collected +'" '+ collectTextCss +'>\n' +
            '        <div><a href="javascript:void(0);" title="收藏"><img class="collect-img" src="image/icon/'+ collectImg +'" /></a></div>\n' +
            '    <div class="collect-num num" data="'+ collectNum +'">'+ collectNum +'</div>\n' +
            '        </li>\n' +
            '        <li class="normal">\n' +
            '        <div class="comment"><a href="/article/read/'+ articleId+'" target="_blank" title="评论"><img src="image/icon/comment.svg" /></a></div>\n' +
            '    <div class="comment-num num" data="'+ commentNum +'">'+ commentNum +'</div>\n' +
            '        </li>\n' +
            '        </ul>\n' +
            '        </div>\n' +
            '        </div>';
        if (cover != "" && cover != null){
            data += '<div class="content-right">\n' +
                '        <img src="/image/article-pic/'+ cover +'">\n' +
                '        </div>'
        }
        data += '</div>';

    }
    $('#content').append(data);
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