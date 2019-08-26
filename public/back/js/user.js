//一进入页面 就发送 ajax的请求
$(function(){
    var currentPage = 1;//当前页
    var pageSize = 5;//每页大小
    var currentId;
    var isDelte;
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
                if(info){
                    var htmlStr = template('tpl',info);
                    $('tbody').html(htmlStr);

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
//模态框事件
    $('tbody').on("click",".btn",function(){
        //模态框显式
        $('#userModal').modal('show');
        //获取用户 id,jquery 中提供了获取自定义属性的方法，data()
        currentId = $(this).parent().data("id");
    //    如果是禁用按钮，说明需要将该用户设置禁用状态，传0,1:启用 0：禁用
        isDelte = $(this).hasClass("btn-danger")? 0 : 1;
    });
$('#submitBtn').click(function(){
   // $('#submitBtn').on("click",".btn",function(){

        $.ajax({
            type:"POST",
            dataType:"json",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:isDelte
            },
            success:function (info) {

                if (info.success){
                    //关闭模态框
                    $('#userModal').modal('hide');
                    //重新渲染该页
                    render();
                }


            }



        });
    });

})