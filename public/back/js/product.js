$(function(){
    var currentPage=1;
    var pageSize=5;
    //定义用来存储已上传图片的数组
    var picArr = [];
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

                var htmlStr = template("productTpl",info);
                $("tbody").html(htmlStr);

                //分页插件渲染
                $("#paginator").bootstrapPaginator({
                // 配置版本
                    bootstrapMajorVersion:3,
                  //  配置按钮文本
                    itemTexts:function(type,page,current){
                    //    每个按钮在初始化时，都会调用一次这个函数，通过返回值进行设置文本
                      switch(type){
                          case "page":
                              return page;
                          case "first":
                              return "首页";
                          case "last":
                              return "尾页";
                          case "prev":
                              return "上一页";
                          case "next":
                              return "下一页";

                      }
                    },
                  //  配置title,每个按钮在初始化时，都会调用一次这个函数，通过返回值设置title文本
                    tooltipTitles:function(type,page,current){
                        switch(type){
                            case "page":
                                return "前往第"+page+"页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";

                        }
                    },
                    //使用bootstrap的提示框
                    useBootstrapTooltip:true,
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


    });
//    校验上传文件
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            //往数组最前面追加图片
            var picObj = data.result;
            var picAddr = picObj.picAddr;
            picArr.unshift(picObj);
            $("#imgBox").prepend('<img src="'+picAddr+'" width="100" >');

            if(picArr.length >3){
                //移除数组中最后一项
                picArr.pop();
            //    移除imgBox中的最后一个图片
                $("#imgBox img").eq(-1).remove();
            }

        //    如果处理后，图片数组的长度为3，那么就通过校验，手动将picStatus置VALID
            if (picArr.length === 3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }
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
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },

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
                    },
                //    正则校验
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"商品库存必须是非零开头的数字"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    //    正则校验
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"尺码必须是xx-xx的格式，例如32-34"
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
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:"请选择三张图片"
                    }
                }
            }
        }

    });

    $("#form").on("success.form.bv", function( e ) {
        e.preventDefault();
        //获取的是表单元素的数据
        var paramsStr = $("#form").serialize();
        //还需要拼接图片地址

        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
        // console.log(paramsStr);
        $.ajax({
            url: "/product/addProduct",
            type: "post",
            dataType:"json",
            data:paramsStr,

            success:function(info){

                if(info.success){

                    //模态框隐藏
                    $("#addModal").modal("hide");
                    //    重置模态框内容
                    $("#form").data("bootstrapValidator").resetForm(true);
                    //    重新渲染页面
                    currentPage = 1;
                    render();

                    //    手动重置 下拉菜单内容
                    $("#dropdownText").text("请选择二级分类");
                    //    删除图片
                    $("#imgBox img").remove();
                    //    重置数组
                    picArr = [];
                }

            }



        });

    });



});