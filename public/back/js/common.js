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

