layui.use('laydate', function(){
	var laydate = layui.laydate;
	lay('.time').each(function(){
		laydate.render({
			elem: this
			,trigger: 'click'
			,type: 'datetime'
    		,format: 'yyyy年MM月dd日 HH:mm'
    		,theme: '#007fff'
		});
	});
	
	lay('.searchDate').each(function(){
		laydate.render({
			elem: this
			,trigger: 'click'
			,type: 'date'
    		,format: 'yyyy年MM月dd日'
    		,theme: '#007fff'
			,done: function(value, date){
                var dateObj = $(".searchDate");
                var searchDate = value;
                var nowDate = getNowDate();
                if (searchDate < nowDate) {
                	console.log(searchDate + "\n" + nowDate);
                    layer.msg("时间不能小于当前时间");
                    dateObj.val(nowDate);
                } else {
                    getActivityList(searchDate, 1)
                }
        	}
		});
	});
});

function getNowDate() {
    var date = new Date();
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
    return Y+M+D;
}

