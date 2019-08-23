$(function(){
    // 基于准备好的dom，初始化echarts实例
    var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

    // 指定图表的配置项和数据
    var option1 = {
        //标题
        title: {
            text: '2019年注册人数'
        },
        //提示框组件
        tooltip: {},
        //图例
        legend: {
            data:['销量']
        },
        //X轴刻度
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月"]
        },
        //y轴刻度，y轴的刻度 应该根据数据动态生成
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [50, 120, 360, 1500, 1300, 20,800,100,480]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_1.setOption(option1);
    var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年8月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right:10,
            top: 20,
            bottom: 20,
            data:['视频广告','联盟广告','邮件营销','直接访问','搜索引擎'],

            // selected: data.selected
        },
        series : [
            {
                name: '姓名',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: [
                    {value:235, name:'视频广告'},
                    {value:274, name:'联盟广告'},
                    {value:310, name:'邮件营销'},
                    {value:335, name:'直接访问'},
                    {value:400, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

     echarts_2.setOption(option2);
})