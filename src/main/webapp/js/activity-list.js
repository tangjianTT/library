$(function(){
    getActivityList("");
    $(".activity-li").addClass("ac").siblings().removeClass("ac");

	$(".time-selector li").on("click", function(){
		// 根据时间筛选
		$(this).addClass("ac").siblings().removeClass("ac");
		var day = $(this).attr("data");
		if (day != null && day != "") {
            getActivityList(parseInt(day), 0)
		}
	})

})

function getActivityList(time, isDate) {
    $.ajax({
        type:"POST",
        url:"/activity/getActivityList",
		dataType:"json",
		data:{
        	"time":time,
			"isDate":isDate
		},
		success:function (result) {
        	var code = result.code;
        	if (code == 1){
                buildActivityList(result.activityList);
			} else {
                $(".article-list-container ul").html("");
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
			'        <a href="/activity/look/'+activityId+'" target="_blank">活动详情</a>\n' +
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
        listContainer.html(data);
	}
}

