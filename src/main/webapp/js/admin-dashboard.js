$(function () {
    $.ajax({
        type:"GET",
        url:"/admin/getUserNumber",
        dataType:"json",
        success:function(result) {
            var userNumber = result.userNumber;
            $(".user-number").text(userNumber);
        },
        error:function(error){
            alert("error")
        }
    });

    $.ajax({
        type:"GET",
        url:"/admin/getArticleNumber",
        dataType:"json",
        success:function(result) {
            var articleNumber = result.articleNumber;
            $(".article-number").text(articleNumber)
        },
        error:function(error){
            alert("error")
        }
    });

    $.ajax({
        type:"GET",
        url:"/admin/getArticleMonthIncreaseNumber",
        dataType:"json",
        success:function(result) {
            var articleMonthIncreaseNumber = result.articleMonthIncreaseNumber;
            $(".article-increase-number").text(articleMonthIncreaseNumber)
        },
        error:function(error){
            alert("error")
        }
    });

    $.ajax({
        type:"GET",
        url:"/admin/getActivityNumber",
        dataType:"json",
        success:function(result) {
            var activityNumber = result.activityNumber;
            $(".activity-number").text(activityNumber)
        },
        error:function(error){
            alert("error")
        }
    });

    $.ajax({
        type:"GET",
        url:"/admin/getDataAnalysis",
        dataType:"json",
        success:function(result) {
            var timeList = result.timeList;
            var dataListContainer = result.dataListContainer;
            buildLineChartExample(timeList, dataListContainer)
        },
        error:function(error){
            alert("error")
        }
    });
    window.onresize = function(){
        setTimeout("myChart.resize()",100);
    }
})

var myChart;

function buildLineChartExample(timeList, dataListContainer){
    myChart = echarts.init(document.getElementById("infoEchart"));
    var series = [];
    var option = {
        title: {
            text: '可多Codu数据监控',
            subtext: '用户、文章、活动',
            x:'center',
            y:'10%'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '5%',
            right: '2%',
            bottom: 5,
            top: '25%',
            containLabel: true
        },
        legend: {
            data:['用户数据','文章数据', '活动数据']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: []
    };

    // 拼装 series
    for(var index = 0; index < dataListContainer.length; index++){
        var name;
        if (index == 0){
            name = "用户数据";
        } else if(index == 1){
            name = "文章数据";
        } else {
            name = "活动数据";
        }

        var item = {
            name:name,
            type:'line',
            data:dataListContainer[index],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }

        series.push(item);
    }
    console.log(series);
    option.series = series;
    myChart.setOption(option)
}
