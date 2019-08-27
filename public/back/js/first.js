$(function(){
    //一进入页面 发ajax
    var currentPage = 1;
    var pageSize = 5;
    render();
   function render(){
       $.ajax({
           type:"get",
           url:"/category/queryTopCategoryPaging",
           dataType:"json",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(info){
               //渲染模板
               var htmlStr = template("tpl",info);
               $("tbody").html(htmlStr);
           //    实现分页功能
               $('#paginator').bootstrapPaginator({
               //  版本3必须  配置版本
                   bootstrapMajorVersion:3,
               //    指定页数
                   totalPages:Math.ceil(info.total / info.size),
               //    当前页
                   currentPage:info.page,
                   //当页面被点击时调用 回调函数，并重新渲染
                   onPageClicked:function(a,b,c,page){
                       //更新当前页
                       currentPage = page;
               //        重新渲染
                       render();
               }



               });

           }



       });
   }


    //添加按钮
    $('#addBtn').click(function(){

        $('#addModal').modal('show');

    });
//   表单校验插件，实现表单校验
    $('#form').bootstrapValidator({
    //    配置图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
        },
        //配置字段
        fields:{
            categoryName:{
            //    校验规则
                validators:{
                //    非空校验
                    notEmpty:{
                        message:"请输入一级分类标题"
                    }
                }
            }
        }
    });
// 阻止默认的成功提交，通过ajax提交
    $('#form').on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),//表单序列化
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#addModal').modal('hide');
                //    页面重新渲染第一页，让用户看到第一页的数据
                    var currentPage = 1;
                    render();

                    // 重置表单校验状态和 表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                    $('#form').data("bootstrapValidator").resetForm( true );
                }
            }

        });
    });



});