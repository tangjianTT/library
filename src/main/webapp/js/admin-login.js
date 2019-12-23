$(function () {
    $(".admin-login").on("click", function () {
        var account = $(".account").val().trim();
        var password = $(".password").val().trim();
        if (account != null && account != "" && password != null && password != ""){
            $.ajax({
                type:"POST",
                url:"/admin/login",
                dataType:"json",
                data:{
                    "account":account,
                    "password":password
                },
                success:function (result) {
                    var code = parseInt(result.code);
                    if (code == 1) {
                        window.location.href="/admin/admin-index";
                    } else {
                        layer.msg("密码错误");
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }
    })
})