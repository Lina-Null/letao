/*
*实现在第一个ajax 发送的时候，开启进度条
* 在所有的
* */
//开启进度条
$("document").ajaxStart(function(){
    NProgress.start();
});

$("document").ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },3000)

});


//登录拦截
/*
* 前后分离，前端是不知道该用户是否登录了
* 发送ajax请求，查询用户状态即可
* 1、用户已登录，啥都不做，让用户访问
* 2、用户未登录，拦截到登录页
* 判断地址栏在没有login.html时，做登录拦截判断
* */
if(location.href.indexOf("login.html") === -1){
    $.ajax({
        type:"get",
        dataType:"json",
        url:"/employee/checkRootLogin",
        success:function(info){
            if(info.success){
                console.log("用户已登录");
            }
            if(info.error === 400){
                console.log("用户未登录");
                location.href="login.html";
            }
        }
    });
}




$(function(){
//1、分类管理切换
    $(".nav .category").click(function(){
        //切换
        $(".nav .child").stop().slideToggle();
    })

    //2、左边切换
    $(".icon_menu").click(function(){
        $(".lt_aside").toggleClass('hidemenu');
        $(".lt_main").toggleClass('hidemenu');
        $(".lt_topbar").toggleClass('hidemenu');
    });


    //点击弹出模态框
    $("#exitModel").click(function(){
        $("#logoutModal").modal('toggle');
    })
    //点击模态框的退出按钮，实现退出功能
    $("#logoutBtn").click(function(){
        //发送ajax请求，进行退出
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "login.html";

                }
            }
        })
    })
})

