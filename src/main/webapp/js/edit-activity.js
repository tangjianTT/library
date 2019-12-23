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
		    'undo',  // 撤销
		    'redo'  // 重复
	    ]
	    // 或者 var editor = new E( document.getElementById('editor') )
	    editor.customConfig.uploadImgServer = '/upload'
	    editor.create();
	
	$(".publish-activity").on("click", function(){
		var title = $(".activity-title").val().trim();
		var content = editor.txt.html();
		var startTime = $(".start-time").val().trim();
		var endTime = $(".end-time").val().trim();
		var place = $(".place").val().trim();
		var cover = $(".cover").attr("data");
		var nowDateTime = getNowDateTime();
		var userId = $("#user-head-pic").attr("data");
		var activityId = $(".publish-activity").attr("data").trim();
		if(cover == null || cover == ""){
			layer.msg("请上传活动封面");
			return;
		}
		if(title == null || title == ""){
			layer.msg("请填写主题");
			return;
		}
		if(startTime == null || startTime == ""){
			layer.msg("开始时间不能为空");
			return;
		}
		if(endTime == null || endTime == ""){
			layer.msg("结束时间不能为空");
			return;
		}
		if(startTime < nowDateTime) {
            console.log(startTime)
            console.log(nowDateTime)
			layer.msg("活动开始时间不得早于当前时间");
			return;
		} else if(endTime <= startTime){
			layer.msg("开始时间不能晚于结束时间");
			return;
		}
		var data = '{"title":"' + title + '",' +
					'"userId":"' + userId + '",' +
					'"cover":"' + cover + '",' +
            		'"content":"' + content + '",' +
					'"place":"' + place + '"}';

		$.ajax({
			type:"POST",
			url:"/activity/addActivity",
			dataType:"json",
			data:{
				"activityJson":data,
				"activityId":activityId,
                "startTime":startTime,
                "endTime":endTime
			},
			success:function (result) {
				var code = result.code;
				var activityId = result.activityId;
				if (code == 1){
					layer.msg("发布成功");
                    window.location.href="/activity/look/"+ activityId;
				} else {
                    console.log("失败了，尴尬不")
				}
            },
			error:function (error) {
				layer.msg(error);
            }
		})
	})

    $("#changeCover").on("change", function () {
        var fileName = $("#changeCover").val().trim();
        if( fileName!= "") {
            var point = fileName.lastIndexOf(".");
            var type = fileName.substr(point).toLocaleLowerCase();
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
                    url:"/activity/uploadCover",
                    cache: false,
                    dataType:"json",
                    data:formData,
                    processData: false,
                    contentType: false,
                    success: function(result){
                        var code = result.code;
                        if(code == 1) {
                            var cover = result.cover;
                            $(".cover-container").removeClass("cover-tip");
                            $(".cover-container").html('<img src="/image/activity-pic/'+cover+'" alt="封面头图"  class="cover" data="'+cover+'" />');
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

function getNowDateTime() {
    var date = new Date();
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '月';
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 ';
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return Y+M+D+h+m;
}

function getTomorrowDateTime() {
    var date = new Date();
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 ';
    return Y+M+D+'00:00';
}