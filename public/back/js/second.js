$(function(){
//    一进入页面 ajax获取数据

    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){

            //渲染模板
                var htmlStr = template('secondTpl',info);
                $('tbody').html(htmlStr);
            //    分页插件渲染
                $('#paginator').bootstrapPaginator({
                //    版本号
                    bootstrapMajorVersion:3,
                //    指定当前页
                    totalPages:Math.ceil(info.total/info.size),
                //    当前页
                    currentPage:info.page,
                //    回调函数
                    onPageClicked:function(a,b,c,page){
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        });
    }
    //模态框
    $('#addBtn').click(function(){
        $('#addModal').modal('show');
        //请求一级分类菜单
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){

                    var htmlStr = template('dropdownTpl',info);
                    $('.dropdown-menu').html(htmlStr);

            }



        });
    });
//    通过事件委托，给dropdown-menu下的 所有 a 绑定点击事件
    $('.dropdown-menu').on("click","a",function(){
        var txt = $(this).text();
        $('.dropdownText').html(txt);
        var id = $(this).data("id");
        $("[name='categoryId']").val(id);

    //    将隐藏域设置校验状态，设置状态成功
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");

    });

//    利用文件上传进行初始化
    /*
* 文件上传思路整理
* 1、引包
* 2、准备结构，name data-url
* 3、文件上传初始化，配置 done 回调函数  回调函数
* 指定响应格式  dataType:"json"
* done:function(e,data){
*   data.result.picAddr;//获取上传的地址
*
* }
*
* */
    $("#fileupload").fileupload({
        //指定响应的数据格式
        dataType:"json",
        //e事件对象
        //data
        done:function(e,data){

            var imgUrl = data.result.picAddr;
            $("#imgBox img").attr("src",imgUrl);
            $("[name='brandLogo']").val(imgUrl);

            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });
    /**
     * 实现表单校验
     */
    $("#form").bootstrapValidator({
        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded:[],
        //配置图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中

        },
        //配置字段
        fields:{


            // 一级分类的id
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            // 品牌名称
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择图片"
                    }
                }
            }
        }

    });
//注册表单校验成功事件，阻止默认提交，通过ajax
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();//阻止默认提交
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            typeData:"json",
            data:$('#form').serialize(),
            success:function(info) {
                // console.log(info);


                    //模态框隐藏
                    $("#addModal").modal('hide');
                    //重置表单里面的内容和校验状态
                    currentPage=1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                    //手动重置文本内容
                    $("#dropdownText").text("请选择一级分类");
                    $("#imgBox img").attr("src","../images/none.png");
                }






        });
    })

});
