$(function(){
    var E = window.wangEditor
    var editor = new E("#toolbar", "#text")
    // 自定义菜单配置
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.customConfig.uploadImgServer = '/upload'
    editor.create();

    $('.btn_div a').click(function() {
        $(this).addClass('ac').siblings().removeClass('ac');
    })

    $('.choose').on('click', function(){
        $(this).addClass('choosed').siblings().removeClass('choosed');
    })


    $('#publish').on('click', function(){
        var classId = $('.choosed').attr("data") || 0;
        var title = $('#title').val().trim();
        var content = editor.txt.html();
        var userId = $('#publish').attr("data").trim();
        var updateId = $('#publish').attr("updateId").trim();
        var articleType = $('.ac').attr("id");
        var cover = $(".cover-img-container img").attr("data") || "";
        if(classId == 0){
            layer.msg("请选择一个分类");
            return;
        }
        if(title == '' || title == null) {
            layer.msg("标题不能为空");
            return;
        }
        if(content == '' || content == null) {
            layer.msg("内容不能为空");
            return;
        }
        var articleJson = '{"userId":"' + userId +
						'","title":"' + title +
                        '","cover":"' + cover +
                        '","classId":' + classId +
						',"labels":"' + labelList +
                        '","articleType":' + articleType + '}';
        $.ajax({
            type:"POST", //提交类型
            url:"/article/publish",
            dataType:"json", //返回的数据类型
            data:{
                "articleJson":articleJson,
                "articleId":updateId,
                "content":content
			}, //传递给控制器的参数
            success:function(result){
                if (result.code == 1){
                    var articleId = result.articleId
                    window.location.href="/article/read/"+ articleId;
                }
            },error:function(error){
                alert("错误");
            }
        });

    })

    var labelList = new Array();
    var index = 0;
    var update = $("#label-container").attr("data");
    var labels = $("#label-container .article-label").each(function () {
        labelList.push($(this).text());
        index++;
    })

    $('#search-label').keydown(function(event) {
        if (event.keyCode == 13) {
            var label = $('#search-label').val().trim();
            if(label != '' && label != null) {
                for(var i=0; i < index; i++){
                    if(labelList[i] == label){
                        layer.msg(label + ' 已经存在');
                        return;
                    }
                }
                labelList[index] = label;
                index++;
                var html = '<div class="article-label" data="'+(index-1)+'">'+label+'</div>';
                $('#label-container').append(html);
                $('#search-label').val("");
            } else{
                layer.msg('请输入标签...');
            }
        }
    })

    $('#label-container').on('dblclick', 'div', function(){
        var rmLabel = $(this).text().trim();
        labelList.splice($(this).attr("data"),1);
        index--;
        $('#label-container').html("");
        for(var i=0; i < index; i++){
            $('#label-container').append('<div class="article-label" data="'+i+'">'+labelList[i]+'</div>');
        }
    })

    $("#changeCover").on("change", function () {
        var fileName = $("#changeCover").val().trim();
        if( fileName!= "") {
            var point = fileName.lastIndexOf(".");
            var type = fileName.substr(point).toLocaleLowerCase();
            var articleId = $(".cover-img-container").attr("data").trim();
            if(type==".jpg"||type==".png"){
                var file = $('#changeCover')[0].files[0];
                var fileSize = file.size;
                if (fileSize > 10485760){
                    layer.msg("图片不得超过10M");
                    return;
                }
                var formData = new FormData();
                formData.append('imageData', file);
                $.ajax({
                    type: "POST",
                    url:"/article/uploadCover",
                    cache: false,
                    dataType:"json",
                    data:formData,
                    processData: false,
                    contentType: false,
                    success: function(result){
                        var code = result.code;
                        if(code == 1) {
                            var cover = result.cover;
                            $(".cover-img-container").html('<img src="/image/article-pic/'+cover+'" alt="封面头图" data="'+cover+'" />');
                        } else {
                            layer.msg("上传失败");
                        }
                    },
                    error: function (error) {
                        alert("上传失败");
                    },
                });
            } else {
                layer.msg("只支持JPG和PNG格式图片")
            }
        }
    })
})
