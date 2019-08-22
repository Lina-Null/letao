$(function(){
    //配置的字段和input中 name是关联的
    $("#form").bootstrapValidator({

        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中

        },
        // 配置字段
        fields:{
            username:{
             // 配置校验规则
             validators:{
                 //非空
                 notEmpty:{
                     //提示信息
                     message:"用户名不能为空"
                 },
                 stringLength:{
                     min:2,
                     max:6,
                     message:"用户名长度在2~6位"
                 },
                 callback:{
                    message:"用户名不存在"
                 }
    }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLenght:{
                        min:6,
                        max:12,
                        message:"密码长度必须是6~12位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }

        }
    });
    /*
    * 登录功能
    * 表单校验插件会在提交表单是进行校验
    * 1、校验成功，默认就提交表单，会发生页面跳转
    * 我们需要注册表单校验成功事件，阻止默认的提交，通过ajax发送请求
    * 2、校验失败，不会提交表单，配置插件提示用户即可
    *
    * */
    $("#form").on('success.form.bv',function(e){
        //阻止默认的表单提交
        e.preventDefault();
    //    使用ajax提交逻辑
        $.ajax({
           type:"post",//请求方式
           url:"/employee/employeeLogin",//提交地址
           data:$("#form").serialize(),//通过表单序列化提交
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = "index.html"
                }
                if(info.error === 1000){
                    //console.log("当前用户名不存在");
                    //updataStatus 更新字段，参数：1、字段名称，2、校验状态 ,3、
                    $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }
                if(info.error === 1001)
                {
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback")
                    //console.log("密码错误");
                }
           }
        });
    });
    /*
    * 重置功能
    * */
    $('[type="reset"]').click(function(){
        //调用插件方法，进行重置校验状态 restForm();
        //参数：若传true,重置内容以及校验状态，若传false,只重置校验状态
        $("#form").data("bootstrapValidator").resetForm();
    });




});