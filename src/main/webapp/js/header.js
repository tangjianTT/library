$(function(){
    $('.nav li').on('click', function() {
        $(this).addClass('ac').siblings().removeClass('ac')
    })

    $('.main-nav li').on('click', function() {
        $(this).addClass('ac').siblings().removeClass('ac');
        getArticleList( $(this).attr("data"));
    })

    $('.theme-popover input').focus(function(){
        $(this).css('border', '1px solid #007fff');
    })
    $('.theme-popover input').blur(function(){
        $(this).css('border', '');
    })

    // 写文章
    $("#writeArticle").on('click', function () {
        $.ajax({
            type:"POST", //提交类型
            url:"/article/writeArticle",
            data:{
            }, //传递给控制器的参数
            success:function(result){
                if (result.code == 0){
                    layer.msg("请先登录");
                } else {
                    window.location.href="/article/write";
                }
            },error:function(error){
                alert("错误");
            }
        });
    })
})