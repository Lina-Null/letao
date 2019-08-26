//一进入页面 就发送 ajax的请求
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            dataType:"json",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                if(info){
                    var htmlStr = template('tpl',info);
                    $('tbody').html(htmlStr);
                    // console.log( info.rows[0].id,info.rows[0].username,info.rows[0].mobile,info.rows[0].isDelete);
                    //分页功能
                    $('#paginator').bootstrapPaginator({
                        //    配置版本
                        bootstrapMajorVersion:3,
                        //    指定总页数
                        totalPages:Math.ceil(info.total/info.size),
                        //当前页
                        currentPage:info.page,
                    //    当页面被点击时用的回调函数
                        onPageClicked:function(a,b,c,page){
                            //动态获取该页
                            currentPage = page;
                            //渲染数据
                            render();
                        }
                    });
                }
            }


        });
    }



})