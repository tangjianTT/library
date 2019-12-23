$(function () {
    getArticleList(1);
    $(".list-header a").on("click", function() {
        $(this).addClass("topic").siblings().removeClass("topic");
        var type = $(this).attr("data");
        $("#column_"+type).show().siblings().hide().html("");
        if (type > 0 && type < 5) {
            getArticleList(parseInt(type));
        } else if (type == 6){
            getFollowingList();
        }else if (type == 7){
            getFollowerList();
        } else if (type == 5){
            getActivityList();
        }
    })

    $("body").delegate(".activity-type-container ul li", "click", function () {
        $(this).find("a").addClass("activity-type").parent().siblings().find("a").removeClass("activity-type");
        var type = $(this).attr("data");
        if (type == 0) {
            // 获得我发布的获得列表
            getActivityList();
        } else if(type == 1){
            // 获得我参加的活动列表
            getParticipatedActivityList();
        }
    })

    $(".up-follow-operate input").on("click", function () {
        var object = $(this);
        var following = object.attr("data");
        var isFollowing = object.attr("isFollowing");
        if (isFollowing == 0){
            $.ajax({
                type:"POST",
                url:"/follow/addFollowing",
                dataType:"json",
                data:{
                    "following":following
                },
                success:function (result) {
                    var code = result.code;
                    if (code == 1){
                        object.val("已关注");
                        object.parent().parent().removeClass("follow-div");
                        object.parent().parent().addClass("following-div");
                        object.attr("isFollowing", 1);
                    } else if (code == 2){
                        layer.msg("请先登录");
                    } else{
                        layer.msg("请刷新重试");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
        } else if (isFollowing == 1){
            $.ajax({
                type:"POST",
                url:"/follow/deleteFollowing",
                dataType:"json",
                data:{
                    "following":following
                },
                success:function (result) {
                    var code = result.code;
                    if (code == 1){
                        object.val("关注");
                        object.parent().parent().removeClass("following-div");
                        object.parent().parent().addClass("follow-div");
                        object.attr("isFollowing", 0);
                    } else if (code == 2){
                        layer.msg("请先登录");
                    } else{
                        layer.msg("请刷新重试");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
        }
    })

    /*添加关注*/
    $("body").delegate(".follow-operate", "click", function () {
        var following = $(this).attr("data");
        var isFollowing = $(this).attr("isFollowing");
        var object = $(this);
        if (isFollowing == 0){
            $.ajax({
                type:"POST",
                url:"/follow/addFollowing",
                dataType:"json",
                data:{
                    "following":following
                },
                success:function (result) {
                    var code = Number(result.code);
                    if (code == 1){
                        object.val("已关注");
                        object.parent().removeClass("follower-btn");
                        object.parent().addClass("following-btn");
                        object.attr("isFollowing", 1);
                    } else if (code == 2){
                        layer.msg("请先登录");
                    } else{
                        layer.msg("请刷新重试");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
        } else if (isFollowing == 1){
            $.ajax({
                type:"POST",
                url:"/follow/deleteFollowing",
                dataType:"json",
                data:{
                    "following":following
                },
                success:function (result) {
                    var code = Number(result.code);
                    if (code == 1){
                        object.val("关注");
                        object.parent().removeClass("following-btn");
                        object.parent().addClass("follower-btn");
                        object.attr("isFollowing", 0);
                    } else if (code == 2){
                        layer.msg("请先登录");
                    } else{
                        layer.msg("请刷新重试");
                    }
                },
                error:function (error) {
                    layer.msg("未知错误");
                }
            })
        }
    })
})

function getArticleList(type) {
    if (type > 0 && type < 5){
        var userId = $("#userName").attr("data");
        if (userId != null && userId != ""){
            $.ajax({
                type:"POST",
                url:"/user/getArticleList",
                dataType:"json",
                data:{
                    "userId":userId,
                    "type":type
                },
                success:function (result) {
                    var list = result.articleList;
                    if(result.code != 1){
                        return;
                    }
                    switch (type){
                        case 1:
                            var obj = $('.article-list');
                            buildArticle(obj, list, 1);
                            break;
                        case 2:
                            buildArticle($('.share-list'), list, 1);
                            break;
                        case 3:
                            buildArticle($('.like-list'), list, 0);
                            break;
                        case 4:
                            buildArticle($('.collection-list'), list, 0);
                            break;
                        default:
                            break;
                    }
                },
                error:function () {
                    layer.msg("未知错误", function () {
                        location.reload();
                    })
                }
            })
        } else {
            layer.msg("请先登录")
        }

    }
}

function buildArticle(obj, articleList, isMine) {
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
        var likeTextCss = "liked";
        if(liked != 1){
            liked = 0;
            likeImg = "like.svg"
            likeTextCss = "normal";
        }
        var collected = article.collected;
        var collectImg = "collected.svg";
        var collectTextCss = "collected";
        if(collected != 1){
            collected = 0;
            collectImg = "collect.svg";
            collectTextCss = "normal";
        }

        var userIdOne = $("#user-head-pic").attr("data");
        var userIdTwo = $("#userName").attr("data");

        var editAndDelete = ""
        if(isMine == 1 && userIdOne == userIdTwo){
            editAndDelete = '<li class="normal reedit" style="border: none; margin:0">\n' +
                            '<a href="javascript:void(0);" title="编辑"><img src="/image/icon/reedit.svg" /></a>' +
                            '</li>\n' +
                            '<li class="normal delete" style="border: none;">\n' +
                            '<a href="javascript:void(0);" title="删除"><img src="/image/icon/delete.svg" /></a>' +
                            ' </li>';
        }
        data += '<div class="one-item">\n' +
            '        <div class="content-left">\n' +
            '        <div class="item-title">\n' +
            '        <a href="/article/read/'+ articleId+'" target="_blank" id="'+ articleId +'">\n' +
            '        <h3>'+ title +'</h3>\n' +
            '        </a>\n' +
            '        </div>\n' +
            '        <div class="item-user">\n' +
            '        <span class="item-info"><a href="/user/homepage/'+userId+'" data="'+ userId +'">'+ nickname +'</a></span>\n' +
            '    <span class="item-info">·</span>\n' +
            '    <span class="item-info">'+ publishTime +'</span>\n' + labels +
            '        </div>\n' +
            '        <div class="item-subtitle">\n' +
            '        <ul class="item-subtitle-text" data="'+ articleId +'">\n' +
            '        <li class="like '+likeTextCss+'" liked="'+ liked +'">\n' +
            '        <div><a href="javascript:void(0);" title="喜欢"><img class="like-img" src="/image/icon/'+ likeImg +'" /></a></div>\n' +
            '    <div class="like-num num" data="'+ likeNum +'">'+ likeNum +'</div>\n' +
            '        </li>\n' +
            '        <li class="collect '+ collectTextCss +'" collected="'+ collected +'">\n' +
            '        <div><a href="javascript:void(0);" title="收藏"><img class="collect-img" src="/image/icon/'+ collectImg +'" /></a></div>\n' +
            '    <div class="collect-num num" data="'+ collectNum +'">'+ collectNum +'</div>\n' +
            '        </li>\n' +
            '        <li class="normal">\n' +
            '        <div class="comment"><a href="/article/read/'+ articleId+'" target="_blank" title="评论"><img src="/image/icon/comment.svg" /></a></div>\n' +
            '    <div class="comment-num num" data="'+ commentNum +'">'+ commentNum +'</div>\n' +
            '        </li>\n' +
                editAndDelete +
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
    obj.html(data);
}

function getFollowingList() {
    var userId = $("#userName").attr("data");
    $.ajax({
        type:"POST",
        url:"/follow/getFollowingList",
        dataType:"json",
        data:{
            "userId":userId
        },
        success:function (result) {
            var list = result.followingList;
            buildFollowingList($('.following-list'), list);
        },
        error:function () {
            layer.msg("未知错误", function () {})
        }
    })
}

function getFollowerList() {
    var userId = $("#userName").attr("data");
    $.ajax({
        type:"POST",
        url:"/follow/getFollowerList",
        dataType:"json",
        data:{
            "userId":userId
        },
        success:function (result) {
            var list = result.followerList;
            buildFollowingList($('.follower-list'), list);
        },
        error:function () {
            layer.msg("未知错误", function () {
                location.reload();
            })
        }
    });
}

function buildFollowingList(obj, list) {
    var data = "";
    if(list != null && list.length > 0){
        for (var index = 0; index < list.length; index++){
            var user = list[index];
            var userId = user.userId;
            var headPic = user.headPic;
            var nickname = user.nickname;
            var job = user.job;
            if (job == null || job == ""){
                job = "";
            }
            var company = user.company;
            if (company == null || company == ""){
                company = "";
            }
            var introduction = user.introduction;
            var github = user.github;
            var homepage = user.homepage;
            var isFollowing = user.isFollowing;
            var operate = "";
            if(isFollowing == 1){
                operate = '    <div class="following-btn" >\n' +
                    '        <input type="button" class="following follow-operate" isFollowing="'+isFollowing+'" data="'+userId+'" value="已关注" />\n' +
                    '   </div>\n';
            } else {
                operate = '    <div class="follower-btn" >\n' +
                    '        <input type="button" class="follower follow-operate" isFollowing="0" data="'+userId+'" value="关注" />\n' +
                    '   </div>\n';
            }
            data += '<div class="one-user" >\n' +
                '    <div class="follow-nav">\n' +
                '        <div class="follow-head-div">\n' +
                '            <a href="/user/homepage/'+userId+'"><img src="/image/head-pic/'+headPic+'" class="follow-head-pic" /></a>\n' +
                '        </div>\n' +
                '        <div class="follow-name-job">\n' +
                '            <div class="follow-name"><a href="/user/homepage/'+userId+'"><span><b>'+nickname+'</b></span></a></div>\n' +
                '            <div class="follow-job">'+job+'<span>@</span>'+company+'</div>\n' +
                '        </div>\n' +
                '    </div>\n' + operate +
                '</div>';
        }
        obj.html(data);
    } else {
        layer.msg("暂无数据");
    }
}

function getActivityList() {
    var userId = $("#userName").attr("data");
    $.ajax({
        type:"POST",
        url:"/user/getActivityList",
        dataType:"json",
        data:{
            "userId":userId
        },
        success:function (result) {
            var code = result.code;
            var data = '<div class="activity-type-container">' +
                '<ul>' +
                '<li data="0"><a class="my-publish-activity activity-type">我举办的</a></li>' +
                '<li data="1"><a class="my-participated-activity">我参加的</a></li>' +
                '</ul>' +
                '</div>';
            data += ' <div class="article-list-container">\n'+
                    '    <ul>' +
                    '    </ul>' +
                    '</div>';
            $(".activity-list").html(data);
            if (code == 1){
                buildActivityList(result.activityList);
            }
        },
        error:function (error) {
            alert("error")
        }
    })
}

function getParticipatedActivityList() {
    var userId = $("#userName").attr("data");
    $.ajax({
        type:"POST",
        url:"/user/getParticipatedActivityList",
        dataType:"json",
        data:{
            "userId":userId
        },
        success:function (result) {
            var code = result.code;
            $(".article-list-container ul").html("");
            if (code == 1){
                buildParticipatedActivityList(result.activityList);
            } else {
                layer.msg("暂未参与活动");
            }
        },
        error:function (error) {
            alert("error")
        }
    })
}

function buildActivityList(activityList) {
    if (activityList != null && activityList.length > 0){
        var listContainer = $(".article-list-container ul");
         var data = ""
        for(var index = 0, len = activityList.length; index < len; index++){
            var activity = activityList[index];
            var activityId = activity.activityId;
            var title = activity.title;
            var cover = activity.cover;
            var startTime = activity.startTime;
            var place = activity.place;
            var participateNum = activity.participateNum;
            var participated = activity.participated;
            var state = activity.state;
            var userIdOne = $("#user-head-pic").attr("data");
            var userIdTwo = $("#userName").attr("data");
            var operateHtml = ""
            // 如果两个ID相等，表明此列表用户有编辑和删除权限
            if (userIdOne == userIdTwo){
                operateHtml = '<div class="edit-delete" data="'+activityId+'">' +
                                    '<a class="edit-activity">编辑</a>' +
                                    '<a class="delete-activity">删除</a>' +
                                '</div>';
            } else {
                if (participated == 1){
                    operateHtml = '<div class="participate-activity">'+
                                  '     <a title="参加活动" data="'+activityId+'" isActivity="'+state+'">'+
                                  '         <img src="/image/icon/participated.svg" data="1">' +
                                  '         <span class="participated-style">已参加</span>' +
                                  '     </a>'+
                                  '</div>\n';
                } else {
                    operateHtml = '<div class="participate-activity">'+
                                '     <a title="参加活动" data="'+activityId+'" isActivity="'+state+'">'+
                                '         <img src="/image/icon/participate.svg" data="0">' +
                                '         <span></span>' +
                                '     </a>'+
                                '</div>\n';
                }
            }
            data += '<li>\n' +
                '  <div>\n' +
                '    <div>\n' +
                '      <img src="/image/activity-pic/'+cover+'" class="activity-cover"/>\n' +
                '    </div>\n' +
                '    <div class="activity-info">\n' +
                '      <div>\n' +
                '        <a><b>'+title+'</b></a>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/time.svg"  />\n' +
                '        <span>'+startTime+'</span>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/place.svg"  />\n' +
                '        <span>'+place+'</span>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/participant.svg"  />\n' +
                '        <span>'+participateNum+'</span><span>人参加</span>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '    <div class="activity-operate">\n' +
                '      <div class="activity-detail">\n' +
                '        <a href="/activity/look/'+activityId+'">活动详情</a>\n' +
                '      </div>\n' +
                    operateHtml +
                '    </div>\n' +
                '  </div>\n' +
                '</li>'
        }
        listContainer.html(data);
    }
}


function buildParticipatedActivityList(activityList) {
    console.log(activityList);
    if (activityList != null && activityList.length > 0){
        var listContainer = $(".article-list-container ul");
        var data = "";
        for(var index = 0, len = activityList.length; index < len; index++){
            var activity = activityList[index];
            var activityId = activity.activityId;
            var title = activity.title;
            var cover = activity.cover;
            var startTime = activity.startTime;
            var place = activity.place;
            var participateNum = activity.participateNum;
            var participated = activity.participated;
            var state = activity.state;
            var isParticipateHtml = ""
            if (participated == 1){
                isParticipateHtml = '<img src="/image/icon/participated.svg" data="1">' +
                    '<span class="participated-style">已参加</span>';
            } else {
                isParticipateHtml = '<img src="/image/icon/participate.svg" data="0">\n' +
                    '<span></span>';
            }
            data += '<li>\n' +
                '  <div>\n' +
                '    <div>\n' +
                '      <img src="/image/activity-pic/'+cover+'" class="activity-cover"/>\n' +
                '    </div>\n' +
                '    <div class="activity-info">\n' +
                '      <div>\n' +
                '        <a><b>'+title+'</b></a>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/time.svg"  />\n' +
                '        <span>'+startTime+'</span>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/place.svg"  />\n' +
                '        <span>'+place+'</span>\n' +
                '      </div>\n' +
                '      <div class="data">\n' +
                '        <img src="/image/icon/participant.svg"  />\n' +
                '        <span>'+participateNum+'</span><span>人参加</span>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '    <div class="activity-operate">\n' +
                '      <div class="activity-detail">\n' +
                '        <a href="/activity/look/'+activityId+'">活动详情</a>\n' +
                '      </div>\n' +
                '      <div class="participate-activity">'+
                '        <a title="参加活动" data="'+activityId+'" isActivity="'+state+'">'+
                    isParticipateHtml +
                '        </a>'+
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</li>'
        }
        console.log(data)
        listContainer.html(data);
    }
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