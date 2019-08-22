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

})