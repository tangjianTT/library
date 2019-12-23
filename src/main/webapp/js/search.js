$(function(){
    $(".search-input").on("keyup", function(event) {
        if (event.keyCode == 13) {
            var keyword = $('.search-input').val().trim();
            if (keyword != null && keyword != ""){
                window.location.href="/search/searchArticleList/"+keyword;
            }
        }
    })

    $('.search-logo-img').on("click", function(){
        var keyword = $('.search-input').val().trim();
        if (keyword != null && keyword != ""){
            window.location.href="/search/searchArticleList/"+keyword;
        }
    })

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
})

