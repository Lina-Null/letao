$(function(){
    var currentPage=1;
    var pageSize=5;
    render();
    //一进页面 发送 ajax
    function render(){
        $.ajax({
            type:"get",
            url:" /product/queryProductDetailList",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){

                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);

                //分页插件渲染
                $("#paginator").bootstrapPaginator({
                // 配置版本
                    bootstrapMajorVersion:3,
                  //  指定页数
                  totalPages:Math.ceil(info.total/info.size),
                //    当前页
                    currentPage:info.page,
                //  点击回调函数
                    onPageClick:function(a,b,c,page){
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }



                });

            }
        });
    }


//    模态框 加载
    $("#addBtn").click(function(){
        $("#addModal").modal("show");
        $.ajax({
            type:"get",
            url:" /category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("secondTpl",info);
                $(".dropdown-menu").html(htmlStr);
            }

        });


    });

//    通过事件委托 给a添加点击事件
    $(".dropdown-menu").on("click","a",function(){

        var txt = $(this).text();
        var id = $(this).data("id");

        $(".dropdownText").text(txt);
    //将 id 到input
        $("[name ='brandId']").val(id);


    //    表单校验
        $("#from").data("bootstrapValidator").updatStatus("brandId","VALID");
    });
//    校验上传文件
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            var imgUrl = data.result.picAddr;
            $("#imgBox").appendChild("img");
            $("img").height(50).width(50);
            $("img").attr("src",imgUrl);




        }



    });

//表单校验
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


            // 商品名称
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            Price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品现价"
                    }
                }
            }
        }

    });

})