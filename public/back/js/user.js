//一进入页面 就发送 ajax的请求
$(function(){
    $.ajax({
        type:"get",
        dataType:"json",
        url:"/user/queryUser",
        data:{
            page:1,
            pageSize:5
        },
        success:function(info){
            console.log(info);
           if(info){
                var htmlStr = template('tpl',info);
              $('tbody').html(htmlStr);
              // console.log( info.rows[0].id,info.rows[0].username,info.rows[0].mobile,info.rows[0].isDelete);

           }
        }


    });
})